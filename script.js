const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const letters = "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff95";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters.charAt(Math.floor(Math.random() * letters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 50);

function setupInteractiveTerminal() {
  const outputEl = document.getElementById("terminal-output");
  const inputEl = document.getElementById("terminal-input");
  if (!outputEl || !inputEl) return;

  const PROMPT = "type-here~$";

  function print(line = "", className) {
    const div = document.createElement("div");
    div.textContent = line;
    div.className = "terminal-line" + (className ? " " + className : "");
    outputEl.appendChild(div);
    outputEl.scrollTop = outputEl.scrollHeight;
  }

  const asciiLogo = [
  "  /--------------------------------------------------------------\\",
  "  |                         RGalindoOS                           |",
  "  \\--------------------------------------------------------------/"
  ];



  function formatSystemDate(d) {
    const weekdays = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    const pad = (n) => (n < 10 ? "0" + n : "" + n);

    const wd = weekdays[d.getUTCDay()];
    const mon = months[d.getUTCMonth()];
    const day = pad(d.getUTCDate());
    const h = pad(d.getUTCHours());
    const m = pad(d.getUTCMinutes());
    const s = pad(d.getUTCSeconds());
    const year = d.getUTCFullYear();

    return `${wd} ${mon} ${day} ${h}:${m}:${s} UTC ${year}`;
  }

  function printIntro() {
    const now = new Date();
    const lastLogin = new Date(now.getTime() - 1000 * 60 * 42); 

    print("Welcome to RGalindoOS 1.0 (A Linux like shell with limited commands).");
    print("\n");

    asciiLogo.forEach(line => print(line, "ascii-art"));
    print("\n");

    print("Disclaimer: This is a simulated shell for portfolio purposes.");
    print("\n");
    print("Type 'help' to see available commands and what they do,");
    print("or use the navigation bar or the 'View My Projects' button below.");
    print("\n"); 
    print(
      "Commands: whoami | ls projects | cd projects | cd resume | cd contact | clear | help"
    );
    print("\n"); 
 
    print(`System information as of ${formatSystemDate(now)}`);
    print("  System load:    0.0                        Processes:       124");
    print("  Usage of /:     47.2% of 11.21GB           Users logged in: 1");
    print("  Memory usage:   20%                        Swap usage:     0%");
    print();
    print(`Last login: ${formatSystemDate(lastLogin)} on pts/0`);
    print("\n");
  }


  function handleCommand(raw) {
    const cmd = raw.trim();
    if (cmd === "") return;

    switch (cmd) {
      case "help":
        print("Command descriptions:");
        print("  whoami        - show current user");
        print("  ls projects   - list portfolio projects");
        print("  cd projects   - open projects page");
        print("  cd resume     - open resume page");
        print("  cd contact    - open contact page");
        print("  clear         - clear the screen and show MOTD again");
        print("  help          - show this help message");
        break;

      case "whoami":
        print("Rafael Alexander Galindo");
        break;

      case "ls projects":
        print("projects/");
        print("  - Cyber Threat Analyzer");
        print("      ML system for detecting malicious or risky text.");
        print("  - Travel Itinerary Path Optimizer");
        print("      TSP-based route planner using Google Maps + search algorithms.");
        print("");
        print("Use 'cd projects' or the button below to view details.");
        break;

      case "cd projects":
        window.location.href = "projects.html";
        break;

      case "cd resume":
        window.location.href = "resume.html";
        break;

      case "cd contact":
        window.location.href = "contact.html";
        break;

      case "clear":
        outputEl.innerHTML = "";
        printIntro();
        break;

      default:
        print(`bash: ${cmd}: command not found`);
        print("Try: whoami, ls projects, cd projects, cd resume, cd contact, clear, help");
        break;
    }
  }

  printIntro();

  inputEl.focus();

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = inputEl.value;

      const line = document.createElement("div");
      line.className = "terminal-line";
      line.innerHTML = `<span style="color:#00ff95;">${PROMPT}</span> ${value}`;
      outputEl.appendChild(line);
      outputEl.scrollTop = outputEl.scrollHeight;

      handleCommand(value);
      inputEl.value = "";
    }
  });

  outputEl.addEventListener("click", () => inputEl.focus());
  document
    .querySelector(".terminal-input-line")
    .addEventListener("click", () => inputEl.focus());
}

document.addEventListener("DOMContentLoaded", setupInteractiveTerminal);
