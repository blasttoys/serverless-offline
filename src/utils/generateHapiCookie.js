export default function generateHapiCookie(cookieString) {
    const name = cookieString.slice(0, cookieString.indexOf("="));
    const value = cookieString.slice(cookieString.indexOf("=") + 1, cookieString.indexOf(";"));

    // Parse attributes into a map
    const attributes = cookieString
        .split(";")
        .slice(1) // skip the name=value part
        .reduce((acc, part) => {
            const [key, val] = part.trim().split("=");
            acc[key.trim().toLowerCase()] = val ? val.trim() : true;
            return acc;
        }, {});

    return {
        name,
        value,
        options: {
            ttl: attributes["max-age"] ? parseInt(attributes["max-age"]) * 1000 : undefined,
            isSecure: attributes["secure"] === true,
            isHttpOnly: attributes["httponly"] === true,
            path: attributes["path"],
            domain: attributes["domain"],
            isSameSite: attributes["samesite"] || false,
            encoding: "none",
            strictHeader: false,
        },
    };
}