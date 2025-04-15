// Question 2: click and view count with timestamp

function getTimestamp() { //gets a timestamp
    return new Date().toISOString();
  }
  
  function getObjectType(el) { //gets object type
    if (el.tagName === "IMG") return "image";
    if (el.tagName === "A") return "link";
    if (el.tagName === "BUTTON") return "button";
    if (el.tagName === "SELECT") return "drop-down";
    if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") return "text-box";
    if (el.tagName === "P") return "text";
    if (el.tagName === "H1" || el.tagName === "H2" || el.tagName === "H3") return "heading";
    return "other";
  }
  
  document.addEventListener("click", (e) => { // keeps track of all click events
    const type = getObjectType(e.target); //get type of object
    console.log(`${getTimestamp()} , click , ${type}`); //print timestamp, click, obj type
  });
  
  const observer = new IntersectionObserver( //view while scrolling
    (entries) => { //array of observed changes
      entries.forEach((entry) => { //for each change
        if (entry.isIntersecting) { //whether element is visible on the page
          const type = getObjectType(entry.target);
          console.log(`${getTimestamp()} , view , ${type}`);
        }
      });
    },
    {
      threshold: 1, //only prints when the element is entirely visible on the page
    }
  );
  
  window.addEventListener("DOMContentLoaded", () => {
    const elementsToTrack = document.querySelectorAll("p, img, a, h1, h2, h3");
    elementsToTrack.forEach((el) => observer.observe(el));
  });  

//question 3: text analyzer

  function analyzeText() {
    const text = document.getElementById("textInput").value; //get input
  
    const numLetters = (text.match(/[a-zA-Z]/g) || []).length; //get number of letters
    const numWords = (text.match(/\b\w+\b/g) || []).length; //number of words
    const numSpaces = (text.match(/ /g) || []).length; //number of spaces
    const numNewlines = (text.match(/\n/g) || []).length; //newlines
    const numSpecial = (text.match(/[^a-zA-Z0-9\s]/g) || []).length; //special characters
  
    //match with the following list
    const pronouns = ["i", "you", "he", "she", "it", "we", "they", "me", "him", "her", "us", "them", "my", "your", "his", "its", "our", "their"];
    const prepositions = ["in", "on", "at", "since", "for", "ago", "before", "to", "past", "by", "under", "over", "of", "with", "about", "against"];
    const articles = ["a", "an"];
  
    const wordList = text.toLowerCase().match(/\b[a-z]+\b/g) || [];
  

    const countGroup = (group) => {
      return group.reduce((acc, word) => {
        const count = wordList.filter(w => w === word).length;
        if (count > 0) acc[word] = count;
        return acc;
      }, {});
    };
  
    const pronounCounts = countGroup(pronouns);
    const prepositionCounts = countGroup(prepositions);
    const articleCounts = countGroup(articles);
  
    document.getElementById("output").innerHTML = `
      <h3>Text Analysis:</h3>
      <p><strong>Letters:</strong> ${numLetters}</p>
      <p><strong>Words:</strong> ${numWords}</p>
      <p><strong>Spaces:</strong> ${numSpaces}</p>
      <p><strong>Newlines:</strong> ${numNewlines}</p>
      <p><strong>Special Characters:</strong> ${numSpecial}</p>
      <h3>Pronouns:</h3><pre>${JSON.stringify(pronounCounts, null, 2)}</pre>
      <h3>Prepositions:</h3><pre>${JSON.stringify(prepositionCounts, null, 2)}</pre>
      <h3>Indefinite Articles:</h3><pre>${JSON.stringify(articleCounts, null, 2)}</pre>
    `;
  }
  