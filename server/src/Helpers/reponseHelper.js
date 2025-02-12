const codehttp = {
    200: "Request successful",
    201: "Resource created successfully",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    503: "Service Unavailable"
};

const responseHelper = (res, code, data, custome = null) => {
    return res.status(code).json({
        status: code,
        message: codehttp[code] || "Unknown status",
        data: data || null,
        ...(custome && typeof custome === "object" ? custome : {})
    });
};

module.exports = responseHelper;