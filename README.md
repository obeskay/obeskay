# 🐝 SwarmVille - AI Agent Coordination Framework

> Turn parallel execution into synchronized teamwork for your AI agents

[![npm version](https://img.shields.io/npm/v/swarm-ville)](https://www.npmjs.com/package/swarm-ville)
[![Node.js version](https://img.shields.io/badge/node-v18.0%2B-brightgreen)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/obeskay/swarm-ville/ci.yml)](https://github.com/obeskay/swarm-ville/actions)

## 🎯 The Problem with Multi-Agent Systems

Most "multi-agent" frameworks are just glorified task runners. They execute agents in parallel, but that's not coordination. Real teamwork means:

- **Communication**: Agents talking to each other, not just to the orchestrator
- **Knowledge Sharing**: Building on each other's work instead of starting from scratch
- **Conflict Avoidance**: Smart task distribution and duplicate prevention
- **Collective Learning**: Agents improving based on team performance

SwarmVille provides the coordination layer that turns a group of AI agents into a real team.

## ✨ Key Features

### 🗣️ Agent Communication Network
```typescript
// Agents can communicate directly with each other
const weatherAgent = new Agent({
  name: 'weather-expert',
  capabilities: ['weather-api', 'forecasting'],
  communication: {
    publish: ['weather-updates', 'storm-alerts'],
    subscribe: ['location-data', 'user-preferences']
  }
});

const notificationAgent = new Agent({
  name: 'notification-service',
  capabilities: ['push-notifications', 'email'],
  communication: {
    subscribe: ['storm-alerts'],
    publish: ['notification-sent']
  }
});
```

### 🤝 Task Coordination
- **Smart Allocation**: Assigns tasks based on agent capabilities and availability
- **Conflict Resolution**: Prevents duplicate work and priority clashes
- **Progress Tracking**: Real-time updates on task completion across the swarm

### 🧠 Shared State Management
- **Global State**: Shared knowledge base accessible to all agents
- **Local State**: Agent-specific private state when needed
- **State Persistence**: Automatic backup and recovery mechanisms

### 🔄 Result Broadcasting
```typescript
// Agents can publish results for others to consume
const researcher = new Agent({
  name: 'market-researcher',
  onResult: (data) => {
    swarm.broadcast('market-insights', data);
  }
});

const strategist = new Agent({
  name: 'business-strategist',
  onEvent: (event) => {
    if (event.type === 'market-insights') {
      // Build strategy based on fresh research
      this.executeStrategy(event.data);
    }
  }
});
```

## 🚀 Quick Start

### Installation
```bash
npm install swarm-ville
# or
yarn add swarm-ville
```

### Hello Swarm
```typescript
import { Swarm, Agent } from 'swarm-ville';

// Create agents with different capabilities
const contentWriter = new Agent({
  name: 'content-writer',
  capabilities: ['writing', 'research'],
  instructions: 'Create engaging blog posts about technology'
});

const seoExpert = new Agent({
  name: 'seo-optimizer',
  capabilities: ['seo', 'keyword-research'],
  instructions: 'Optimize content for search engines'
});

const socialMedia = new Agent({
  name: 'social-manager',
  capabilities: ['content-sharing', 'community-engagement'],
  instructions: 'Share content across social platforms'
});

// Create and start the swarm
const swarm = new Swarm([contentWriter, seoExpert, socialMedia]);

// Execute a coordinated task
await swarm.execute('create-and-promote-tech-blog-post');

// Monitor progress
swarm.on('task-completed', (result) => {
  console.log('Swarm completed task:', result.summary);
  console.log('Content created:', result.content.length, 'words');
  console.log('SEO score:', result.seo.score);
  console.log('Social posts:', result.social.platforms.length);
});
```

### Advanced Coordination
```typescript
// Define task dependencies
const developmentSwarm = new Swarm([
  new Agent({ name: 'frontend-dev', capabilities: ['react', 'typescript'] }),
  new Agent({ name: 'backend-dev', capabilities: ['node', 'mongodb'] }),
  new Agent({ name: 'tester', capabilities: ['testing', 'e2e'] })
], {
  coordination: {
    dependencies: {
      'build-frontend': [],
      'build-backend': [],
      'integration-test': ['build-frontend', 'build-backend']
    }
  }
});

await developmentSwarm.execute('feature-release');
```

## 📚 Documentation

- [Quick Start Guide](./docs/quick-start.md)
- [Agent Configuration](./docs/agents.md)
- [Coordination Strategies](./docs/coordination.md)
- [Communication Patterns](./docs/communication.md)
- [Examples](./examples/)

## 🧪 Examples

Check out the `examples/` directory for real-world use cases:

- **Content Creation Pipeline**: Multiple agents working together to create, optimize, and distribute content
- **E-commerce Product Launch**: Coordinated efforts from research to marketing
- **Bug Resolution Team**: Developers, testers, and documentation specialists working in sync

## 🔧 Contributing

I built SwarmVille because I was tired of seeing AI agents work like isolated contractors instead of a cohesive team. If you share this vision, I'd love your help!

### How to Contribute

1. **Report Bugs**: Open an issue with reproduction steps and expected behavior
2. **Feature Requests**: Tell me what coordination features you need
3. **Code Contributions**: Pull requests are welcome! Please check the guidelines below
4. **Documentation**: Help make SwarmVille easier to use for everyone

### Development Setup

```bash
# Clone the repository
git clone https://github.com/obeskay/swarm-ville.git
cd swarm-ville

# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build the project
npm run build
```

### Before Contributing

- Read the [Contributing Guidelines](./CONTRIBUTING.md)
- Check that there isn't already an issue for your feature/bug
- Keep code changes focused and well-tested
- Update documentation for any new features

## 🤝 Community

- **Discord**: [Join our community](https://discord.gg/swarm-ville) for real-time discussions
- **GitHub Discussions**: Ask questions and share ideas
- **Twitter**: Follow [@obeskay](https://twitter.com/obeskay) for updates

## 📊 Project Stats

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Node.js-brightgreen" alt="Platform">
  <img src="https://img.shields.io/badge/Language-TypeScript-blue" alt="Language">
  <img src="https://img.shields.io/badge/Style-Prettier-purple" alt="Code Style">
  <img src="https://img.shields.io/badge/Test-Jest-green" alt="Testing">
</p>

## 🙏 Acknowledgments

Built with inspiration from:
- The need for better AI coordination in the industry
- Open source contributors who taught me everything
- Everyone who's ever yelled "Why aren't these agents talking to each other?!"

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

---

Made with ❤️ by [Omar Beskay](https://github.com/obeskay). Because the future of AI is collaboration, not competition.