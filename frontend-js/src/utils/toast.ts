import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export function successToast(msg: string) {
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "#42be65",
        },
    }).showToast();
}

export function errorToast(msg: string) {
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "#fa4d56",
        },
    }).showToast();
}

export function infoToast(msg: string) {
    Toastify({
        text: msg,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "#4589ff",
        },
    }).showToast();
}