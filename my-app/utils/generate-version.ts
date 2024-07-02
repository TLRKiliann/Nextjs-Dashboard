function generateVersion(): string {
    const min: number = 100000000;
    const max: number = 999999999;
    const version = String(Math.floor(Math.random() * (max - min)) + min
    );
    return version;
};