const tokens = {
  player: { description: 'Player name', example: 'confuser' },
  players: { description: 'A list of comma separated player names', example: 'JamsJar, Issy2322, SavannahF' },
  reason: { description: 'The cause of the punishment', example: 'Hacking' },
  ip: { description: 'The punished IP address, IPv4 or IPv6', example: '127.0.0.1' },
  playerId: { description: 'UUID of player', example: 'ae51c849-3f2a-4a37-986d-55ed5b02307f' },
  country: { description: 'Name of country', example: 'United Kingdom' },
  countryIso: { description: 'ISO code of country', example: 'GB' },
  id: { description: 'Numerical identifier (ID)', example: '1' },
  created: { description: 'Date and time punishment issued', example: '02-06-2021 13:42:54' },
  expires: { description: 'Date and time punishment expires', example: '02-06-2021 13:42:54' },
  actor: { description: 'Player name who issued punishment', example: 'JamsJar' }
}

export const messages = {
  duplicateIP: {
    message: '&cWarning: [player] has the same IP as the following banned players:\\n&6[players]',
    tokens: {
      player: tokens.player,
      players: tokens.players
    }
  },
  duplicateIPAlts: {
    message: '&cWarning: [player] has the same IP as the following players:\\n&6[players]',
    tokens: {
      player: tokens.player,
      players: tokens.players
    }
  },
  configReloaded: {
    message: '&aConfiguration reloaded successfully!'
  },
  'deniedNotify.player': {
    message: '&cWarning: [player] attempted to join the server but was denied due to &4[reason]',
    tokens: {
      actor: tokens.actor,
      player: tokens.player,
      reason: tokens.reason
    }
  },
  'deniedNotify.ip': {
    message: '&cWarning: [ip] attempted to join the server but was denied due to &4[reason]',
    tokens: {
      actor: tokens.actor,
      ip: tokens.ip,
      reason: tokens.reason
    }
  },
  deniedMaxIp: {
    message: '&cToo many players with your ip address online'
  },
  deniedMultiaccounts: {
    message: '&cToo many players with your ip address logged in recently'
  },
  deniedCountry: {
    message: '&cYou may not connect from your region',
    tokens: {
      country: tokens.country,
      countryIso: tokens.countryIso
    }
  },
  'time.error.invalid': {
    message: '&cYour time length is invalid'
  },
  'time.error.limit': {
    message: '&cYou cannot perform this action for that length of time'
  },
  'sender.error.notFound': {
    message: '&c[player] not found, are you sure they exist?',
    tokens: {
      player: tokens.player
    }
  },
  'sender.error.offline': {
    message: '&c[player] is offline',
    tokens: {
      player: tokens.player
    }
  },
  'sender.error.noSelf': {
    message: '&cYou cannot perform that action on yourself!'
  },
  'sender.error.exception': {
    message: '&cAn error occured whilst attempting to perform this command. Please check the console for further details.'
  },
  'sender.error.invalidIp': {
    message: '&cInvalid IP address, expecting w.x.y.z format',
    tokens: {
      ip: tokens.ip
    }
  },
  'sender.error.ipNotSupported': {
    message: '&cFetching information by IP address is currently unsupported.'
  },
  'sender.error.offlinePermission': {
    message: '&cYou are not allowed to perform this action on an offline player'
  },
  'sender.error.exempt': {
    message: '&c[player] is exempt from that action',
    tokens: {
      player: tokens.player
    }
  },
  'sender.error.noPermission': {
    message: '&cYou do not have permission to perform that action',
    tokens: {
      player: tokens.player
    }
  },
  'sender.error.invalidReason': {
    message: '&c[reason] is no valid reason.',
    tokens: {
      reason: tokens.reason
    }
  },

  // commands

  'alts.header': {
    message: 'Possible alts found:',
    tokens: {
      ip: tokens.ip
    }
  },

  'export.error.inProgress': {
    message: '&cAn export is already in progress, please wait'
  },
  'export.player.started': {
    message: '&aPlayer ban export started'
  },
  'export.player.finished': {
    message: '&aPlayer ban export finished, file [file] created',
    tokens: {
      file: {
        description: 'Location of export',
        example: 'banned-players-2021-06-01_12-32-10.json'
      }
    }
  },
  'export.ip.started': {
    message: '&aIP ban export started'
  },
  'export.ip.finished': {
    message: '&aIP ban export finished, file [file] created',
    tokens: {
      file: {
        description: 'Location of export',
        example: 'banned-ips-2021-06-01_12-32-10.json'
      }
    }
  },

  'import.error.inProgress': {
    message: '&cAn import is already in progress, please wait'
  },
  'import.player.started': {
    message: '&aPlayer ban import started'
  },
  'import.player.finished': {
    message: '&aPlayer ban import finished'
  },
  'import.ip.started': {
    message: '&aIP ban import started'
  },
  'import.ip.finished': {
    message: '&aIP ban import finished'
  },
  'import.advancedban.started': {
    message: '&aAdvancedBan import started'
  },
  'import.advancedban.finished': {
    message: '&aAdvancedBan import finished'
  },
  'import.h2.started': {
    message: '&aH2 import started'
  },
  'import.h2.finished': {
    message: '&aH2 import finished, please restart the server'
  },

  'info.error.invalidIndex': {
    message: '&cInvalid player option used',
    tokens: {
      ip: tokens.ip
    }
  },
  'info.error.indexRequired': {
    message: '&cMultiple players named [name], found, please select a player by providing an index between 1 and [size], e.g. /bminfo [name] 1',
    tokens: {
      name: {
        description: 'Name searched',
        example: 'confuser'
      },
      size: {
        description: 'Number of players found with same name',
        example: '3'
      }
    }
  },
  'info.error.index': {
    message: '&7#[index] - &6[name] - &4[uuid]',
    tokens: {
      index: {
        description: 'Option to choose',
        example: '0'
      },
      name: {
        description: 'Name searched',
        example: 'confuser'
      },
      uuid: {
        description: 'UUID of player',
        example: 'ae51c849-3f2a-4a37-986d-55ed5b02307f'
      }
    }
  },
  'info.stats.player': {
    message: '&6[player] has been banned [bans] times, muted [mutes] times, kicked [kicks] times and warned [warns] times ([warnPoints] Points) and has [notes] notes',
    tokens: {
      player: tokens.player,
      playerId: tokens.playerId,
      bans: {
        description: 'Total number of bans',
        example: '2'
      },
      mutes: {
        description: 'Total number of mutes',
        example: '2'
      },
      kicks: {
        description: 'Total number of kicks',
        example: '2'
      },
      warns: {
        description: 'Total number of warnings',
        example: '2'
      },
      warnPoints: {
        description: 'Total amount of warning points',
        example: '2'
      },
      notes: {
        description: 'Total number of notes',
        example: '2'
      }
    }
  },
  'info.stats.ip': {
    message: '&6This ip has been banned [bans] times',
    tokens: {
      bans: {
        description: 'Total number of bans',
        example: '2'
      }
    }
  },
  'info.connection': {
    message: '&6Their last connection was with [ip] on [lastSeen]',
    tokens: {
      player: tokens.player,
      ip: tokens.ip,
      lastSeen: {
        description: 'Date and time player last connected in dd-MM-yyyy HH:mm:ss format',
        example: '02-06-2021 13:42:54'
      }
    }
  },
  'info.geoip': {
    message: 'Country: [country] City: [city]',
    tokens: {
      country: tokens.country,
      countryIso: tokens.countryIso,
      city: {
        description: 'Name of city',
        example: 'London'
      }
    }
  },
  'info.ban.permanent': {
    message: '&6Currently banned for &4[reason]&6 by [actor] at [created]',
    tokens: {
      id: tokens.id,
      player: tokens.player,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created
    }
  },
  'info.ban.temporary': {
    message: '&6Currently banned for &4[reason]&6 by [actor] at [created] which expires in [expires]',
    tokens: {
      id: tokens.id,
      player: tokens.player,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created,
      expires: tokens.expires
    }
  },
  'info.ban.dateTimeFormat': {
    message: 'dd-MM-yyyy HH:mm:ss'
  },
  'info.ipban.permanent': {
    message: '&6Currently banned for &4[reason]&6 by [actor] at [created]',
    tokens: {
      id: tokens.id,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created
    }
  },
  'info.ipban.temporary': {
    message: '&6Currently banned for &4[reason]&6 by [actor] at [created] which expires in [expires]',
    tokens: {
      id: tokens.id,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created,
      expires: tokens.expires
    }
  },
  'info.ipban.dateTimeFormat': {
    message: 'dd-MM-yyyy HH:mm:ss'
  },
  'info.mute.permanent': {
    message: '&6Currently muted for &4[reason]&6 by [actor] at [created]',
    tokens: {
      id: tokens.id,
      player: tokens.player,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created
    }
  },
  'info.mute.temporary': {
    message: '&6Currently muted for &4[reason]&6 by [actor] at [created] which expires in [expires]',
    tokens: {
      id: tokens.id,
      player: tokens.player,
      actor: tokens.actor,
      reason: tokens.reason,
      created: tokens.created,
      expires: tokens.expires
    }
  },
  'info.mute.dateTimeFormat': {
    message: 'dd-MM-yyyy HH:mm:ss'
  },
  'info.website.player': {
    message: 'http://yourdomain.com/index.php?action=viewplayer&player=[player]&server=0',
    tokens: {
      player: tokens.player,
      playerId: tokens.playerId
    }
  },
  'info.history.row': {
    message: '&7#[id] &a[&f[type]&a] &6[actor]&f [meta] [reason] - &e[created]',
    tokens: {
      id: tokens.id,
      type: {
        description: 'The record type',
        example: 'Ban'
      },
      reason: tokens.reason,
      actor: tokens.actor,
      created: tokens.created,
      meta: {
        description: 'Additional information pertaining to the record e.g. warning points',
        example: '5'
      }
    }
  },
  'info.history.noResults': {
    message: '&cNo results found'
  },
  'info.history.dateTimeFormat': {
    message: 'dd-MM-yyyy HH:mm:ss'
  },
  'info.ips.row': {
    message: '&e[ip] - &6[join] - [leave]',
    tokens: {
      ip: tokens.ip,
      join: {
        description: 'Date and time player joined the server',
        example: tokens.created.example
      },
      leave: {
        description: 'Date and time player left the server',
        example: tokens.created.example
      }
    }
  },
  'info.ips.dateTimeFormat': {
    message: 'dd-MM-yyyy HH:mm:ss'
  }

}
