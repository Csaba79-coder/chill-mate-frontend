import React, { useEffect, useState } from "react";
import ReactFlow, { Background, Controls, MarkerType } from "reactflow";
import "reactflow/dist/style.css";
import RelationService from '../services/relationService';
import { applyNodeChanges } from "reactflow";

const RelationPage = () => {
    const [nodes, setNodes] = useState([]);
    const [edges, setEdges] = useState([]);

    useEffect(() => {
        RelationService.getAllUsersForGraph()
            .then((res) => {
                const users = res.data;
                console.log("Kapott adatok:", users); // Ellenőrizd, hogy mi jön vissza!

                const nodeList = users.map((user) => ({
                    id: user.id,
                    data: { label: `${user.firstName} ${user.lastName}` },
                    position: { x: Math.random() * 800, y: Math.random() * 600 },
                }));

                const edgeList = [];

                users.forEach((user) => {
                    user.friends.forEach((friend) => {
                        edgeList.push({
                            id: `${user.id}-${friend.id}`,
                            source: user.id,
                            target: friend.id,
                            markerEnd: {
                                type: MarkerType.ArrowClosed,
                            },
                        });
                    });
                });

                console.log("Nodes:", nodeList);
                console.log("Edges:", edgeList);

                setNodes(nodeList);
                setEdges(edgeList);
            })
            .catch((err) => {
                console.error("Hiba a kapcsolatok lekérésénél:", err);
            });
    }, []);

    return (
        <div style={{ width: "100%", height: "100vh" }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={(changes) =>
                    setNodes((nds) => applyNodeChanges(changes, nds))
                }
                fitView
            >
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export default RelationPage;
