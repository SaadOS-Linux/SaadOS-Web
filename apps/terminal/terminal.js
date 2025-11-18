(function () {
    const terminal = document.getElementById("terminal");

    let inputLine = document.getElementById("input-line");

    const promptTemplate = (cwd="~") =>
        `<span class="prompt">saad@saados</span>:<span class="command">${cwd}</span>$ `;

    let currentDir = "~";

    const commandsHelp = [
        "Available demo commands:",
        "  ls        - list fake files",
        "  pwd       - print current directory",
        "  clear     - clear screen",
        "  help      - show this help",
        "  whoami    - show user",
        "  saados    - about this system"
    ];

    function printLine(html, cls="output") {
        const div = document.createElement("div");
        div.className = "line " + cls;
        div.innerHTML = html;
        terminal.insertBefore(div, terminal.lastElementChild);
        terminal.scrollTop = terminal.scrollHeight;
    }

    function printPromptAndInput() {
        const line = document.createElement("div");
        line.className = "line";
        line.innerHTML = promptTemplate(currentDir) +
            `<span id="input-line"></span><span id="cursor">&nbsp;</span>`;
        terminal.appendChild(line);
        terminal.scrollTop = terminal.scrollHeight;

        inputLine = document.getElementById("input-line");
    }

    function handleCommand(cmd) {
        const trimmed = cmd.trim();

        if (!trimmed) return;

        if (trimmed === "kill") {
            window.top.location.href = "redscreen.html";
            return;
        }

        switch (trimmed) {
            case "pwd":
                printLine("/home/saad" + (currentDir === "~" ? "" : currentDir.replace("~", "")));
                break;

            case "ls":
                printLine("Documents  Downloads  Music  Pictures  projects  SaadOS");
                break;

            case "whoami":
                printLine("saad");
                break;

            case "clear":
                const lines = Array.from(terminal.querySelectorAll(".line"));
                lines.forEach(l => terminal.removeChild(l));
                break;

            case "help":
                commandsHelp.forEach(h => printLine(h));
                break;

            case "saados":
                printLine("SaadOS web terminal demo — built by Saad.");
                break;

            default:
                printLine(`bash: ${trimmed}: command not found`);
        }
    }

    document.addEventListener("keydown", function (e) {
        if (e.key === "Tab") {
            e.preventDefault();
            return;
        }

        if (e.key === "Backspace") {
            e.preventDefault();
            inputLine.textContent = inputLine.textContent.slice(0, -1);
            return;
        }

        if (e.key === "Enter") {
            e.preventDefault();
            const cmd = inputLine.textContent;

            const line = document.createElement("div");
            line.className = "line";
            line.innerHTML = promptTemplate(currentDir) +
                `<span class="command">${cmd.replace(/</g,"&lt;")}</span>`;

            terminal.removeChild(terminal.lastElementChild);
            terminal.appendChild(line);

            handleCommand(cmd);

            printPromptAndInput();
            return;
        }

        if (e.key.length === 1) {
            inputLine.textContent += e.key;
            terminal.scrollTop = terminal.scrollHeight;
        }
    });

})();
