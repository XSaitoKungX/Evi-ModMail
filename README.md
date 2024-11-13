<p align="center">
  <img alt="Shields IO Badge" src="https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge">
  <br>
  <img alt="GitHub Stars" src="https://img.shields.io/github/stars/XSaitoKungX/Evi-ModMail?style=for-the-badge">
  <img alt="GitHub Forks" src="https://img.shields.io/github/forks/XSaitoKungX/Evi-ModMail?style=for-the-badge">
  <img alt="GitHub Issues" src="https://img.shields.io/github/issues/XSaitoKungX/Evi-ModMail?style=for-the-badge">
  <img alt="GitHub License" src="https://img.shields.io/github/license/XSaitoKungX/Evi-ModMail?style=for-the-badge">
  <img alt="GitHub Contributors" src="https://img.shields.io/github/contributors/XSaitoKungX/Evi-ModMail?style=for-the-badge">
</p>

# Evi Mod-Mail Bot

Evi Mod-Mail is an open-source Discord bot designed to streamline communication between users and moderators. Built using `discord.js v14.16.3`, this bot provides a simple interface for users to reach out to the moderation team directly through private messages, which are then routed to a specific modmail channel within the server.

## 📖 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Dependencies](#dependencies)
- [Configuration](#configuration)
- [To-Do List](#to-do-list)
- [Implemented Features](#implemented-features)
- [Contributing](#contributing)
- [Contributors](#contributors)
- [Contributor Stats](#contributor-stats)
- [License](#license)
- [Support](#support)
- [FAQ](#faq)

## 🌟 Introduction
Evi Mod-Mail is an open-source Discord bot designed to streamline communication between users and moderators. This bot provides a simple and effective interface for users to communicate directly with server moderators via private messages. Built using `discord.js v14.16.3`, it enables messages to be routed seamlessly to dedicated modmail channels within the Discord server.

## 🌟 Features
- Users can send private messages to the bot to create a Mod-Mail channel.
- Moderators receive notifications in a dedicated server channel when a new ticket is created.
- Close tickets via multiple methods, including a button.
- Supports custom commands for managing tickets.
- Designed for scalability and ease of use.
- Supports multiple Discord servers with separate configurations.
- Customizable ticket embed messages and branding.
- Detailed logging for each mod-mail activity.
- Automatic archiving of closed tickets.
- Configurable welcome messages for first-time users.

## ⚙️ Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/XSaitoKungX/Evi-ModMail.git
   cd Evi-ModMail.git
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
- **Reopening a Ticket**: A closed ticket can be reopened using a designated command (planned feature).
- **Viewing Archived Tickets**: Moderators can view archived tickets for reference and record-keeping.

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
│   │   └── setup/
│   │       └── setup.js
│   ├── events/
│   │   ├── client/
│   │       ├── ready.js
│   │   ├── guild/
│   │       ├── interactionCreate.js
│   │       ├── messageCreate.js
│   │   ├── other/
│   │       └── closeTicket.js
│   ├── functions/
│   │   ├── modmail/
│   │   │   ├── createThread.js
│   │   │   ├── closeThread.js
│   │   │   └── userSettings.js
│   │   └── helpers.js
│   ├── schema/
│   │   ├── setupSchema.js
│   │   ├── modmailSchema.js
│   │   └── userSettingSchema.js
│   └── services/
│       ├── database.js
│       └── discordClient.js
├── index.js
├── .env
├── .gitignore
├── LICENSE
├── package.json
└── README.md
```

## 🚀 Technologies Used
- **Programming Language:**  
  <img alt="JavaScript" src="https://img.shields.io/badge/-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">

- **Build Tool:**  
  <img alt="Node.js" src="https://img.shields.io/badge/-Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white">
  <img alt="npm" src="https://img.shields.io/badge/npm-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white">

- **Deployment Platform:**  
  <img alt="GitHub" src="https://img.shields.io/badge/-GitHub-181717?style=for-the-badge&logo=github&logoColor=white">
  <img alt="Pterodactyl" src="https://img.shields.io/badge/-Pterodactyl-00C7B7?style=for-the-badge&logo=pterodactyl&logoColor=white">
  <img alt="Pelican.dev" src="https://img.shields.io/badge/Pelican.dev-000000?style=for-the-badge&color=blue">

## 📦 Dependencies
Based on `package.json`, the main dependencies include:
- **discord.js**: A powerful Node.js module to interact with the Discord API.
- **dotenv**: Loads environment variables from a `.env` file into `process.env`.
- **mongoose**: Used for MongoDB object modeling.
- **yaml**: Parsing and manipulating `.yaml` configuration files.
- **winston**: For logging bot activities and errors.

To see a complete list of dependencies, refer to `package.json`.

## 🛠️ Configuration
- **config.yaml**: This file contains all bot-related configuration settings, such as the command prefix, default language, and other general bot behavior settings.
- **Languages**: The bot supports multi-language configurations located in `src/configs/lang/`. You can add or modify language support by editing or adding YAML files here.

## 📋 To-Do List
- [ ] Add multi-language support for bot messages.
- [ ] Create a command to reopen closed tickets.
- [ ] Implement logging functionality for ticket messages.
- [ ] Add an automated welcome message for first-time users.
- [ ] Improve error handling and add more detailed logging for troubleshooting.
- [ ] Add support for archived ticket history to provide moderators access to past tickets.
- [ ] Integrate webhooks for logging ticket activity into third-party services.
- [ ] Add a user feedback system for closed tickets to gather user insights.
- [ ] Develop a web dashboard for managing bot settings and viewing statistics.

## ✅ Implemented Features
- [x] Creation of modmail threads when a user sends a DM.
- [x] Automated embed generation in modmail channels.
- [x] Moderators are pinged when a new ticket is created.
- [x] Ability to close tickets via command (`/ticket close` or `e.close`) or via a button.
- [x] Role-based access to the close button for moderators and administrators.
- [x] Configurable language support for bot messages.
- [x] Detailed logging for each action taken on a ticket.
- [x] Support for multiple Discord servers with distinct configurations.
- [x] Automated welcome message for new users.

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

## 📊 Contributor Stats
<img src="https://github-readme-stats.vercel.app/api?username=XSaitoKungX&show_icons=true&theme=github_dark&include_all_commits=true&count_private=true" alt="Contributor Stats" style="margin-top: 10px;">
<br>
<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=XSaitoKungX&show_icons=true&theme=github_dark&include_all_commits=true&count_private=true&layout=compact" alt="Top Languages" style="margin-top: 10px;">
<br>
<img src="https://github-readme-streak-stats.herokuapp.com/?user=XSaitoKungX&theme=github-dark-blue&hide_border=true" alt="GitHub Streak Stats" style="margin-top: 10px;">
<br>
<img src="https://github-profile-trophy.vercel.app/?username=XSaitoKungX&theme=darkhub&margin-w=15&margin-h=15" alt="GitHub Trophies" style="margin-top: 10px;">
<br>
<img src="https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=XSaitoKungX&theme=github_dark" alt="Commits per Hour" style="margin-top: 10px;">
<br>
<img src="https://github-readme-stats.vercel.app/api/pin/?username=XSaitoKungX&repo=Evi-ModMail&theme=github_dark" alt="Popular Repository" style="margin-top: 10px;">
<br>
<img src="https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=XSaitoKungX&theme=github_dark" alt="Profile Summary Card" style="margin-top: 10px;">

## 📜 License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## 🆘 Support
If you need help or have questions about Evi Mod-Mail, feel free to reach out via the following channels:
- **GitHub Issues**: Report bugs or request features by opening an issue [here](https://github.com/XSaitoKungX/Evi-ModMail/issues).
- **Discord Server**: [Join](https://discord.gg/auz) our community on Discord for real-time support and discussions.
- **Email**: Contact us at [support@evimodmail.com](mailto:support@evimodmail.com) for further assistance.

## ❓ FAQ
**1. How do I configure the bot for multiple servers?**  
You can add multiple configurations to `config.yaml`, and the bot will adapt based on the server ID. Make sure to test each configuration thoroughly.

**2. What permissions does the bot need?**  
The bot requires the following permissions: `READ_MESSAGES`, `SEND_MESSAGES`, `MANAGE_CHANNELS`, and `EMBED_LINKS` to properly function within a server.

**3. How can I add new languages?**  
To add new languages, create a new YAML file in `src/configs/lang/` and follow the structure of existing files like `en_EN.yaml`.

**4. How can I view past tickets?**  
Archived tickets are stored and can be accessed via a command by moderators. Ensure you have proper permissions set to view archived ticket data.

