/* Print the original logo in synchronized layers. The image remains visible
   without JavaScript, on image errors, or when reduced motion is preferred. */
document.querySelectorAll("[data-logo-printer]").forEach(printer => {
    const stage = printer.querySelector(".brand-print-stage");
    const image = printer.querySelector(".brand-logo-image");
    const replay = printer.querySelector(".brand-print-replay");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = null;

    function finish() {
        if (frame !== null) cancelAnimationFrame(frame);
        frame = null;
        stage.classList.remove("is-printing");
        image.style.clipPath = "none";
        replay.hidden = motion.matches;
        replay.disabled = false;
    }

    function printLogo() {
        if (motion.matches || !image.complete || !image.naturalWidth) {
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
            const layerProgress = progress * layers - layer;
            const sweep = layer % 2 ? 1 - layerProgress : layerProgress;
            const height = 100 - layer / layers * 100;
            image.style.clipPath = `inset(${height}% 0 0 0)`;
            stage.style.setProperty("--print-y", `${height}%`);
            stage.style.setProperty("--nozzle-x", `${9 + sweep * 82}%`);
            frame = requestAnimationFrame(step);
        }
        frame = requestAnimationFrame(step);
    }

    replay.addEventListener("click", printLogo);
    if (motion.addEventListener) motion.addEventListener("change", finish);
    if (image.complete) printLogo();
    else {
        image.addEventListener("load", printLogo, { once: true });
        image.addEventListener("error", finish, { once: true });
    }
});
