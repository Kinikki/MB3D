/* The logo's own printer head prints the separate MB3D Creations wordmark. */
document.querySelectorAll("[data-logo-printer]").forEach(printer => {
    const stage = printer.querySelector(".brand-print-stage");
    const image = printer.querySelector(".brand-logo-image");
    const head = printer.querySelector(".brand-actual-printhead");
    const images = [image, head];
    const replay = printer.querySelector(".brand-print-replay");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = null;

    function finish() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        stage.classList.remove("is-printing");
        image.style.clipPath = "none";
        stage.style.setProperty("--print-y", "0%");
        stage.style.setProperty("--nozzle-x", "50%");
        replay.hidden = motion.matches;
        replay.disabled = false;
    }

    function printLogo() {
        if (motion.matches || images.some(asset => !asset.complete || !asset.naturalWidth)) {
            finish();
            return;
        }
        if (frame !== null) cancelAnimationFrame(frame);
        replay.hidden = false;
        replay.disabled = true;
        image.style.clipPath = "inset(100% 0 0 0)";
        stage.style.setProperty("--print-y", "100%");
        stage.classList.add("is-printing");
        let start = null;
        const duration = 4800;
        const layers = 48;

        function step(time) {
            if (start === null) start = time;
            const progress = Math.min((time - start) / duration, 1);
            if (progress >= 1 || motion.matches) {
                finish();
                return;
            }
            const layer = Math.floor(progress * layers);
            const pass = progress * 12;
            const sweep = Math.floor(pass) % 2 ? 1 - (pass % 1) : pass % 1;
            const height = 100 - layer / layers * 100;
            image.style.clipPath = `inset(${height}% 0 0 0)`;
            stage.style.setProperty("--print-y", `${height}%`);
            stage.style.setProperty("--nozzle-x", `${14 + sweep * 61}%`);
            frame = requestAnimationFrame(step);
        }
        frame = requestAnimationFrame(step);
    }

    replay.addEventListener("click", printLogo);
    if (motion.addEventListener) motion.addEventListener("change", finish);
    let started = false;
    function startWhenReady() {
        if (!started && images.every(asset => asset.complete && asset.naturalWidth)) {
            started = true;
            printLogo();
        }
    }
    images.forEach(asset => {
        asset.addEventListener("load", startWhenReady, { once: true });
        asset.addEventListener("error", finish, { once: true });
    });
    if (motion.matches) finish();
    else startWhenReady();
});
