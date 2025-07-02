const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./sesClient");

const createSendEmailCommand = (toAddress, fromAddress, userData) => {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New User Signup - DevTinder</title>
        <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f5f5f5; }
            .container { max-width: 500px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; }
            .header { color: #333; margin-bottom: 20px; }
            .user-info { background: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0; }
            .user-info p { margin: 5px 0; color: #555; }
            .footer { margin-top: 20px; padding-top: 15px; border-top: 1px solid #eee; color: #777; font-size: 14px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>🎉 New User Signup on DevTinder</h2>
            </div>
            
            <p>A new developer has joined the platform:</p>
            
            <div class="user-info">
                <p><strong>Name:</strong> ${userData.name || 'Not provided'}</p>
                <p><strong>Email:</strong> ${userData.email}</p>
                <p><strong>Signup Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <div class="footer">
                <p>DevTinder Platform Notification</p>
            </div>
        </div>
    </body>
    </html>`;

    const textContent = `New User Signup - DevTinder

A new developer has joined the platform:

Name: ${userData.name || 'Not provided'}
Email: ${userData.email}
Signup Date: ${new Date().toLocaleDateString()}

DevTinder Platform Notification`;

    return new SendEmailCommand({
        Destination: {
            ToAddresses: [toAddress],
        },
        Message: {
            Body: {
                Html: {
                    Charset: "UTF-8",
                    Data: htmlContent,
                },
                Text: {
                    Charset: "UTF-8",
                    Data: textContent,
                },
            },
            Subject: {
                Charset: "UTF-8",
                Data: `New Developer Signup: ${userData.name || userData.email}`,
            },
        },
        Source: fromAddress,
    });
};

const run = async (userData) => {
    const sendEmailCommand = createSendEmailCommand(
        "gowrisankarramella3@gmail.com", // Your email (owner)
        "support@tinderdev.site",
        userData
    );

    try {
        return await sesClient.send(sendEmailCommand);
    } catch (caught) {
        if (caught instanceof Error && caught.name === "MessageRejected") {
            const messageRejectedError = caught;
            return messageRejectedError;
        }
        throw caught;
    }
};

// Usage example:
// run({
//     name: "John Doe",
//     email: "john@example.com", 
//     skills: "React, Node.js, MongoDB",
//     location: "New York, USA"
// });

module.exports = { run };