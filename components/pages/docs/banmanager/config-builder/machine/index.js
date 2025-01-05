import { createMachine, assign } from 'xstate'
import { AskQuestion } from '../ask-question'
import { ConnectionForm } from '../connection-form'

const setContext = (field) => assign((context, event) => ({ ...context, [field]: event.type }))

export const stages = [
  {
    id: 'setupType',
    label: 'Type',
    component: AskQuestion('Do you run a single server, or a network?')
  },
  {
    id: 'networkType',
    label: 'Network Type',
    component: AskQuestion('What type of server are you running?')
  },
  {
    id: 'serverType',
    label: 'Server Type',
    component: AskQuestion('What type of server are you running?')
  },
  {
    id: 'syncType',
    label: 'Data Sharing',
    component: AskQuestion('Do you want punishments to apply to all servers or individual servers?')
  },
  {
    id: 'storageType',
    label: 'Storage',
    component: AskQuestion('Where do you wish to store your data?')
  },
  {
    id: 'storageConnection',
    component: ConnectionForm,
    parent: 'storageType'
  },
  {
    id: 'success'
  }
]

export const machine = createMachine({
  id: 'v7-config-builder',
  initial: 'setupType',
  context: {
    networkType: null,
    setupType: null,
    serverType: null,
    host: '127.0.0.1',
    port: 3306,
    name: 'banmanager',
    user: 'minecraft_server',
    password: ''
  },
  states: {
    setupType: {
      on: {
        Network: {
          target: 'syncType',
          actions: setContext('setupType')
        },
        Single: {
          target: 'serverType',
          actions: setContext('setupType')
        }
      }
    },
    networkType: {
      on: {
        BungeeCord: {
          target: 'storageType',
          actions: setContext('networkType')
        },
        LilyPad: {
          target: 'serverType',
          actions: setContext('networkType')
        },
        Velocity: {
          target: 'storageType',
          actions: setContext('networkType')
        }
      }
    },
    serverType: {
      on: {
        'CraftBukkit/Spigot/Paper': {
          target: 'storageType',
          actions: setContext('serverType')
        },
        Fabric: {
          target: 'storageType',
          actions: setContext('serverType')
        },
        Sponge: {
          target: 'storageType',
          actions: setContext('serverType')
        }
      }
    },
    syncType: {
      on: {
        Individual: {
          target: 'serverType',
          actions: setContext('syncType')
        },
        All: {
          target: 'networkType',
          actions: setContext('syncType')
        }
      }
    },
    storageType: {
      on: {
        MySQL: {
          target: 'storageConnection',
          actions: setContext('storageType')
        },
        MariaDB: {
          target: 'storageConnection',
          actions: setContext('storageType')
        },
        H2: {
          target: 'success',
          actions: setContext('storageType'),
          cond: (context) => context.syncType !== 'INDIVIDUAL' && (!context.networkType || context.networkType === 'BUNGEECORD' || context.networkType === 'VELOCITY')
        }
      }
    },
    storageConnection: {
      on: {
        success: {
          target: 'success',
          actions: assign((context, event) => {
            return { ...context, ...event.response }
          })
        }
      }
    },
    success: {
      type: 'final'
    }
  }
})
