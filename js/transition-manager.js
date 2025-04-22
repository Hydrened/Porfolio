"use strict";
class TransitionManager {
    constructor() {
        this.initTransitionElement();
        this.initLinks();
        this.initMoves();
    }
    initTransitionElement() {
        this.element = document.querySelector(".transition-effect");
    }
    initLinks() {
        [...document.querySelectorAll("a[href]:not(.extern)")].forEach((a) => {
            const link = a.getAttribute("href");
            if (link === null) {
                return;
            }
            const href = link;
            a.removeAttribute("href");
            a.addEventListener("click", () => {
                this.element.classList.add("open");
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            });
        });
    }
    initMoves() {
        [...document.querySelectorAll("[move-direction][move-delay][move-duration]")].forEach((element) => {
            if (element == null) {
                return;
            }
            const el = element;
            const moveDirection = el.getAttribute("move-direction");
            const moveDelay = el.getAttribute("move-delay");
            const moveDuration = el.getAttribute("move-duration");
            if (moveDirection === null || moveDelay === null || moveDuration === null) {
                return;
            }
            const direction = moveDirection;
            const delay = parseInt(moveDelay);
            const duration = parseInt(moveDuration);
            el.classList.add("move-" + direction);
            el.style.transition = duration + "ms";
            setTimeout(() => {
                el.classList.remove("move-" + direction);
                setTimeout(() => {
                    el.style.transition = "";
                }, duration);
            }, delay);
        });
    }
}
;
window.addEventListener("load", () => {
    new TransitionManager();
});
