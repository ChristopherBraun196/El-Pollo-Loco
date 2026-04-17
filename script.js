/**
 * Loads the imprint template and opens the dialog.
 */
function openImpress() {
  document.getElementById("impressum").innerHTML = impressumTemplate();
  document.getElementById("impressum").showModal();
}

/**
 * Closes the imprint dialog.
 */
function closeImpressum() {
  document.getElementById("impressum").close();
}

/**
 * Returns the HTML content of the imprint dialog.
 * @returns {string} HTML string of the imprint.
 */
function impressumTemplate() {
  return `
  <div class="dialog-content">
     <button id="closeImpressum"onclick="closeImpressum()" >&#x2715;</button>
    <h2>Impressum</h2>

    <h3>Angaben gemäß § 5 TMG</h3>
    <p>
      Christopher Braun<br>
      Cramerstr. 3<br>
      55450 Langenlonsheim
    </p>

    <h3>Kontakt</h3>
    <p>
      E-Mail: dev.Christopher.Braun@gmail.com<br>
      <!-- Telefon: +49 (0) XXX XXXXXXX -->
    </p>

    <h3>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h3>
    <p>
      Christopher Braun<br>
      Cramerstr. 3<br>
      55450 Langenlonsheim
    </p>

    <h3>Haftungsausschluss</h3>
    <p>
      Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt.
      Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird
      jedoch keine Gewähr übernommen.
    </p>

    <h3>Haftung für Links</h3>
    <p>
      Diese Website enthält Links zu externen Websites Dritter, auf deren
      Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten
      ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
    </p>

    <h3>Urheberrecht</h3>
    <p>
      Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser
      Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
      Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
      Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des
      jeweiligen Autors bzw. Erstellers.
    </p>

    <button id="closeImpressum"onclick="closeImpressum()" >Schließen</button>
  </div>

    `;
}

/**
 * Hides the start screen and starts the game.
 */
function startGame() {
  document.activeElement.blur();
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("startButton").style.display = "none";
}

/**
 * Reloads the page and starts the game directly via URL parameter.
 */
function restartGame() {
  window.location.href = window.location.pathname + "?restart=true";
}

/**
 * Checks if a restart was triggered via URL parameter and starts the game directly.
 */
function checkRestart() {
  if (new URLSearchParams(window.location.search).get("restart")) {
    startGame();
    window.history.replaceState({}, "", window.location.pathname);
  }
}

/**
 * Reloads the page and shows the start screen.
 */
function goHome() {
  location.reload();
}

/**
 * Loads the Lottie animation for the rotate hint overlay.
 */
function rotateScreen() {
  lottie.loadAnimation({
    container: document.getElementById("lottie-rotate"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "./assets/img/screens/Rotate Phone.json",
  });
}
