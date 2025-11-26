$(function () {

    function openApp(appID, url, title, iconPath) {

        const $window = $(`#${appID}-window`);
        const $frame  = $window.find("iframe");

        $window.css("display", "flex").hide().fadeIn(200);
        if (url) $frame.attr("src", url);

        if (!$(`#task-${appID}`).length) {

            $("#task-items").append(`
                <div class="task-icon" id="task-${appID}">
                    <img src="${iconPath}" style="width:22px; height:22px; margin-right:6px;">
                    <span>${title}</span>
                    <button class="task-close" data-app="${appID}"
                        style="
                        margin-left:8px;
                        background:#ff5f56;
                        color:white;
                        border:none;
                        width:18px;
                        height:18px;
                        border-radius:50%;
                        cursor:pointer;
                        font-weight:bold;
                    ">×</button>
                </div>
            `);

            $(`#task-${appID}`).on("click", function (e) {
                if ($(e.target).hasClass("task-close")) return;
                $window.fadeIn(200);
            });

            $(`.task-close[data-app="${appID}"]`).on("click", function () {
                $window.fadeOut(200);
                $frame.attr("src", "");
                $(`#task-${appID}`).remove();
            });
        }

        // close button
        $window.find(".close-btn").off().on("click", function () {
            $window.fadeOut(200);
            $frame.attr("src", "");
            $(`#task-${appID}`).remove();
        });

        // minimize button
        $window.find(".min-btn").off().on("click", function () {
            $window.fadeOut(200);
        });

        // maximize toggle
        let maximized = false;
        let oldPos = {};
        $window.find(".max-btn").off().on("click", function () {

            if (!maximized) {
                oldPos = {
                    top: $window.css("top"),
                    left: $window.css("left"),
                    width: $window.css("width"),
                    height: $window.css("height"),
                };

                $window.css({
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "calc(100% - 40px)"
                });

            } else {
                $window.css({
                    top: oldPos.top,
                    left: oldPos.left,
                    width: oldPos.width,
                    height: oldPos.height
                });
            }

            maximized = !maximized;
        });


        // drag window
        let drag = false, offX, offY;
        $window.find(".window-header").off().on("mousedown", function (e) {
            drag = true;
            const rect = $window[0].getBoundingClientRect();
            offX = e.clientX - rect.left;
            offY = e.clientY - rect.top;
        });

        $(document).on("mousemove", function (e) {
            if (drag) {
                $window.css({
                    top: e.clientY - offY,
                    left: e.clientX - offX
                });
            }
        }).on("mouseup", () => drag = false);
    }


    // === Desktop Icons ===
    $("#browser-icon").on("click", function () {
        openApp("browser", "https://calm-daffodil-7a888b.netlify.app/", "Browser", "images/browser.png");
    });

    $("#terminal-icon").on("click", function () {
        openApp("terminal", "apps/terminal.html", "Terminal", "images/terminal.png");
    });

    $("#calc-icon").on("click", function () {
        openApp("calc", "apps/calc.html", "Calculator", "images/calc.png");
    });

    // *** Added Minesweeper ***
    $("#mine-icon").on("click", function () {
        openApp("minesweeper", "apps/minesweeper.html", "Minesweeper", "images/minesweeper.png");
    });

    $("#chess-icon").on("click", function () {
        openApp("chess", "https://0xsaadcontainer.netlify.app/chess", "SaadChess", "images/chess.png");
    });


});


// === Start Menu ===
$("#start-btn").on("click", function (e) {
    e.stopPropagation();
    $("#start-menu").fadeToggle(150);
});

$(document).on("click", function () {
    $("#start-menu").fadeOut(150);
});


$(".start-item").on("click", function () {
    const app = $(this).data("app");

    if (app === "browser") $("#browser-icon").click();
    if (app === "terminal") $("#terminal-icon").click();
    if (app === "calc") $("#calc-icon").click();
    if (app === "Minesweeper") $("#mine-icon").click();
    if (app === "SaadChess") $("#chess-icon").click();

    $("#start-menu").fadeOut(100);
});


// ========================
// WALLPAPER SYSTEM
// ========================

// اسم مجلد الخلفيات
const wallpapersFolder = "wallpapers/";

// هنا ضع أسماء صور الخلفيات الموجودة في المجلد
const wallpapers = [
    "images/wallpaper1.png",
    "images/wallpaper2.png",
    "images/wallpaper3.png",
    "images/wallpaper4.png"
];

// تحميل الخلفية المحفوظة
function loadSavedWallpaper() {
    const saved = localStorage.getItem("saados_wallpaper");
    if (saved) {
        document.getElementById("desktop").style.backgroundImage = `url(${saved})`;
    }
}

// تغيير الخلفية + الحفظ
function setWallpaper(filename) {
    const path = wallpapersFolder + filename;
    document.getElementById("desktop").style.backgroundImage = `url(${path})`;
    localStorage.setItem("saados_wallpaper", path);
}

// إنشاء عناصر الخلفيات داخل File Manager
function loadWallpaperFiles() {
    let container = document.getElementById("files-area");
    container.innerHTML = "";

    wallpapers.forEach(file => {
        let div = document.createElement("div");
        div.className = "wallpaper-item";
        div.style.padding = "8px";
        div.style.border = "1px solid #00ffaa33";
        div.style.borderRadius = "6px";
        div.style.marginBottom = "10px";
        div.style.cursor = "pointer";
        div.style.display = "flex";
        div.style.alignItems = "center";
        div.style.gap = "10px";

        div.innerHTML = `
            <img src="${wallpapersFolder + file}" style="width:60px;height:60px;border-radius:4px;">
            <span>${file}</span>
        `;

        div.onclick = () => setWallpaper(file);

        container.appendChild(div);
    });
}

// تشغيل النظام عند بدء الصفحة
loadSavedWallpaper();
loadWallpaperFiles();


document.getElementById("files-icon").onclick = () => {
    openWindow("files-window");
};
