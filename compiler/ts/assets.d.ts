
declare module "*.css" {
    const api: {
        use: () => void;
        unuse: () => void;
    };
    export default api;
}

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: string;
    export default value;
}
