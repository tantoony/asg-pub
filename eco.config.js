module.exports = {
  apps: [
    {
      name: "central",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/CENTRAL"
    },
    {
      name: "gr1",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Guard_1"
    },
    {
      name: "gr2",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Guard_2"
    },
    {
      name: "gr3",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Guard_3"
    },
    /*
    {
      name: "guard_4",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Guard_4"
    },
    {
      name: "guard_5",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Guard_5"
    },
    */
    {
      name: "registry",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Registry"
    },
    {
      name: "moderator",
      script: 'index.js',
      watch: false,
      exec_mode: "cluster",
      max_memory_restart: "2G",
      cwd: "./apps/Moderator"
    }
  ]
};
