import React from "react";
import "../styles/HomePage.css";

function HomePage() {
    return (
        <div className="home-page" id="home-page">
            <header className="home-header" id="home-header">
                <h1>Üdvözöllek a Chill Mate alkalmazásban!</h1>
                <img src={require(`../assets/pannon-logo.png`)} alt="Suli Logo" className="home-logo" id="home-logo" />

                <div id="home-graph-info">
                    <p className="graph-intro" id="graph-intro">
                        Ebben az alkalmazásban a felhasználók és érdeklődési köreik egy gráfban jelennek meg, ahol a felhasználók és az érdeklődési körök is csomópontok, és az őket összekötő kapcsolatok élek formájában jelennek meg.
                    </p>

                    <h3 className="relation-title" id="one-way-relations-title">Egyirányú kapcsolatok:</h3>
                    <ul className="home-no-bullets" id="one-way-relations">
                        <li><b>lakhely:</b> LIVES_IN</li>
                        <li><b>hobbi:</b> LIKES_HOBBY</li>
                        <li><b>sport:</b> PLAYS_SPORT</li>
                        <li><b>zenei műfajt:</b> LIKES_MUSIC</li>
                        <li><b>film:</b> LIKES_MOVIE</li>
                        <li><b>eseményen (amin részt venne):</b> WANTS_TO_ATTEND</li>
                    </ul>
                    <p className="note-text" id="one-way-note">Ezek a kapcsolatok mindig az adott személytől indulnak ki, és valamely érdeklődési terület irányába mutatnak.</p>

                    <h3 className="relation-title" id="two-way-relations-title">Kétirányú kapcsolat:</h3>
                    <ul className="home-no-bullets" id="two-way-relations">
                        <li><b>barátság/ismerettség:</b> IS_FRIEND_WITH</li>
                    </ul>
                    <p className="note-text" id="two-way-note">Ez a kapcsolat két személy között jön létre, és mindkét irányban érvényes. Ha valaki barátja valakinek, akkor ez fordítva is lehet igaz.</p>
                </div>
            </header>
        </div>
    );
}

export default HomePage;
