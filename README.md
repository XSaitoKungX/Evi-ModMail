# Evi Mod-Mail Bot

Evi Mod-Mail is an open-source Discord bot designed to streamline communication between users and moderators. Built using `discord.js v14.16.3`, this bot provides a simple interface for users to reach out to the moderation team directly through private messages, which are then routed to a specific modmail channel within the server.

## 📖 Table of Contents
- [Features](#features)
- [To-Do](#to-do)
- [Implemented Features](#implemented-features)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Features
- Users can send private messages to the bot to create a Mod-Mail channel.
- Moderators receive notifications in a dedicated server channel when a new ticket is created.
- Close tickets via multiple methods, including a button.
- Supports custom commands for managing tickets.
- Designed for scalability and ease of use.

## 🚀 To-Do
[ ] Add multi-language support for bot messages.
[ ] Create a command to reopen closed tickets.
[ ] Implement logging functionality for ticket messages.
[ ] Add an automated welcome message for first-time users.
[ ] Improve error handling and add more detailed logging for troubleshooting.

## ✅ Implemented Features
[x] Creation of modmail threads when a user sends a DM.
[x] Automated embed generation in modmail channels.
[x] Moderators are pinged when a new ticket is created.
[x] Ability to close tickets via command (`/ticket close` or `e.close`) or via a button.
[x] Role-based access to the close button for moderators and administrators.

## 📂 Folder Structure
```
Evi-Mod-Mail/
├── src/
│   ├── configs/
│   │   ├── config.yaml
│   │   └── lang/
│   │       ├── en_EN.yaml
│   │       └── de_DE.yaml
│   ├── commands/
│   ├── messages/
│   ├── events/
│   │   ├── client/
│   │   ├── guild/
│   │   └── other/
│   ├── functions/
│   │   ├── modmail/
│   │   │   ├── createThread.js
│   │   │   ├── closeThread.js
│   │   │   └── helpers.js
│   ├── schemas/
│   │   ├── setupSchema.js
│   │   └── userSettingsSchema.js
│   └── services/
│       └── discordClient.js
├── index.js
├── .env
├── .gitignore
└── README.md
```

## ⚙️ Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/evi-mod-mail.git
   cd evi-mod-mail
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment variables**
   - Create a `.env` file in the root directory:
     ```
     DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
     DISCORD_CLIENT=YOUR_CLIENT_ID
     DISCORD_SECRET=YOUR_CLIENT_SECRET
     DISCORD_ID=YOUR_DISCORD_USER_ID
     MONGO_URL=YOUR_MONGODB_CONNECTION_URL
     OWNER_ID=YOUR_DISCORD_USER_ID
     ```

4. **Configure settings**
   - Edit `config.yaml` to customize settings such as prefixes and other bot preferences.

5. **Start the bot**
   ```bash
   node index.js
   ```

## 📝 Usage
- **Creating a Ticket**: Users can create a Mod-Mail ticket by sending a direct message to the bot.
- **Closing a Ticket**: Moderators can close a ticket by using the `/ticket close` or `e.close` commands, or by pressing the provided close button.

## 🤝 Contributing
We welcome contributions to improve Evi Mod-Mail. To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

Please make sure to update tests as appropriate.

## 👥 Contributors
- [xsaitox](https://github.com/xsaitox) - Initial idea, main development
- [ChatGPT](https://openai.com) - Assisting in development

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
