import { onMounted, onUnmounted, ref, watch } from "vue";

export function useDarkMode() {
    const mode = ref("system"); // Tracks 'light', 'dark', or 'system' mode
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)"); // System preference

    const applyMode = () => {
        const html = document.documentElement;

        if (mode.value === "dark") {
            html.classList.add("dark");
        } else if (mode.value === "light") {
            html.classList.remove("dark");
        } else {
            // System mode: dynamically apply based on system preference
            html.classList.toggle("dark", prefersDark.matches);
        }
    };

    const handleSystemThemeChange = () => {
        if (mode.value === "system") {
            applyMode();
        }
    };

    // Load mode from localStorage during initialization
    const initialize = () => {
        const storedMode = localStorage.getItem("theme");
        mode.value = storedMode || "system";
        applyMode();
    };

    // Watch for changes in `mode` and persist them in `localStorage`
    watch(mode, (newMode) => {
        localStorage.setItem("theme", newMode);
        applyMode();
    });

    // Add and clean up system preference listener
    onMounted(() => {
        initialize(); // Ensure initialization happens on mount
        prefersDark.addEventListener("change", handleSystemThemeChange);
    });

    onUnmounted(() => {
        prefersDark.removeEventListener("change", handleSystemThemeChange);
    });

    // Expose functionality
    return {
        mode,
        setMode: (newMode) => (mode.value = newMode), // Setter for the mode
        initialize,
    };
}
