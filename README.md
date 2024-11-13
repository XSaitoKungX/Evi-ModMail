<p align="center">
  <img alt="Shields IO Badge" src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge">
</p>

# Evi Mod-Mail Bot

Evi Mod-Mail is an open-source Discord bot designed to streamline communication between users and moderators. Built using `discord.js v14.16.3`, this bot provides a simple interface for users to reach out to the moderation team directly through private messages, which are then routed to a specific modmail channel within the server.

## 📖 Table of Contents
- [Features](#features)
- [To-Do](#to-do)
- [Implemented Features](#implemented-features)
- [Folder Structure](#folder-structure)
- [Setup](#setup)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [License](#license)

## 🌟 Features
- Users can send private messages to the bot to create a Mod-Mail channel.
- Moderators receive notifications in a dedicated server channel when a new ticket is created.
- Close tickets via multiple methods, including a button.
- Supports custom commands for managing tickets.
- Designed for scalability and ease of use.

## 🚀 To-Do
- [ ] Add multi-language support for bot messages.
- [ ] Create a command to reopen closed tickets.
- [ ] Implement logging functionality for ticket messages.
- [ ] Add an automated welcome message for first-time users.
- [ ] Improve error handling and add more detailed logging for troubleshooting.

## ✅ Implemented Features
- [x] Creation of modmail threads when a user sends a DM.
- [x] Automated embed generation in modmail channels.
- [x] Moderators are pinged when a new ticket is created.
- [x] Ability to close tickets via command (`/ticket close` or `e.close`) or via a button.
- [x] Role-based access to the close button for moderators and administrators.

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

## 🚀 Verwendete Technologien
- **Programmiersprache:**  
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

- **Build-Tool:**  
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="npm" src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">

- **Deployment Platform:**  
  <img alt="GitHub" src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img alt="Pterodactyl" src="https://img.shields.io/badge/-Pterodactyl-00C7B7?style=for-the-badge&logo=pterodactyl&logoColor=white">
  <img alt="Pelican.dev" src="https://img.shields.io/badge/Pelican.dev-000000?style=for-the-badge&color=blue">

## 🤝 Contributing
We welcome contributions to improve Evi Mod-Mail. To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push the branch (`git push origin feature-branch`).
5. Open a pull request.

Please make sure to update tests as appropriate.

## 👥 Contributors
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/xsaitox">
        <img src="https://avatars.githubusercontent.com/u/64774999?v=4" width="100" height="100" style="border-radius: 50%;" alt="xsaitox"/>
        <br />
        <sub><b>@xsaitox</b></sub>
      </a>
    </td>
    <td align="center">
      <a href="https://openai.com">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1200px-ChatGPT_logo.svg.png" width="100" height="100" style="border-radius: 50%;" alt="ChatGPT"/>
        <br />
        <sub><b>@ChatGPT</b></sub>
      </a>
    </td>
  </tr>
</table>

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
