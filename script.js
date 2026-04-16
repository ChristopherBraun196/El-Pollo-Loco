function openImpress() {
  document.getElementById("impressum").innerHTML = impressumTemplate();
  document.getElementById("impressum").showModal();
}

function closeImpressum() {
document.getElementById("impressum").close();
}

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

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("startButton").style.display = "none";
}

function restartGame(){
   location.reload(); 
}

function goHome(){
   location.reload(); 
}