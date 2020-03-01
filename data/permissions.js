const permissions = [
  ['bm.command.ban', 'Allows a player to permanently ban someone'],
  ['bm.command.ban.offline', 'Required to permanently ban an offline player'],
  ['bm.command.ban.override', 'Allows overriding an existing ban'],
  ['bm.command.tempban', 'Allows a player to tempban someone'],
  ['bm.command.tempban.offline', 'Required to temporary ban an offline player'],
  ['bm.command.tempban.override', 'Allows overriding of an existing ban'],
  ['bm.command.unban', 'Allows a player to unban someone'],
  ['bm.command.unban.own', 'Allows a player to only unban a player they banned'],
  ['bm.command.unban.delete', 'Allows using -d flag to delete a ban without creating a ban record'],
  ['bm.command.warn', 'Allows you to warn a player'],
  ['bm.command.warn.offline', 'Allows you to warn an offline player who will be shown the message when they next join'],
  ['bm.command.tempwarn', 'Allows you to temporarily warn a player'],
  ['bm.command.tempwarn.offline', 'Allows you to temporarily warn an offline player who will be shown the message when they next join'],
  ['bm.command.sync', 'Allows you to forcefully sync database changes'],
  ['bm.command.baniprange', 'Allows you to permanently ban an ip range'],
  ['bm.command.tempbaniprange', 'Allows you to temporary ban an ip range'],
  ['bm.command.unbaniprange', 'Allows you to unban an ip range'],
  ['bm.command.banlist', 'Allows you to see active punishments stored in memory'],
  ['bm.command.banlist.players', 'Allows you to see active player bans stored in memory'],
  ['bm.command.banlist.ips', 'Allows you to see active ip bans stored in memory'],
  ['bm.command.banlist.ipranges', 'Allows you to see active ip range bans stored in memory'],
  ['bm.command.activity', 'Allows you to see recent punishment activity'],
  ['bm.command.clear', 'Allows clearing of a players records'],
  ['bm.command.clear.banrecords', 'Allows clearing of a player\'s ban records'],
  ['bm.command.clear.kicks', 'Allows clearing of a player\'s kick records'],
  ['bm.command.clear.muterecords', 'Allows clearing of a player\'s mute records'],
  ['bm.command.clear.notes', 'Allows clearing of a player\'s notes'],
  ['bm.command.clear.reports', 'Allows clearing of a player\'s reports'],
  ['bm.command.clear.warnings', 'Allows clearing of a player\'s warnings'],
  ['bm.command.delete', 'Allows deleting a players record'],
  ['bm.command.delete.banrecords', 'Allows deleting a player\'s ban record'],
  ['bm.command.delete.kicks', 'Allows deleting a player\'s kick record'],
  ['bm.command.delete.muterecords', 'Allows deleting a player\'s mute record'],
  ['bm.command.delete.notes', 'Allows deleting a player\'s note'],
  ['bm.command.delete.reports', 'Allows deleting a player\'s report'],
  ['bm.command.delete.warnings', 'Allows deleting a player\'s warning'],
  ['bm.command.addnote', 'Allows adding a note to a player'],
  ['bm.command.notes', 'Allows viewing all notes of a player'],
  ['bm.command.notes.online', 'Allows viewing all notes of players currently online'],
  ['bm.command.bminfo', 'Allows use of /bminfo which shows your current ban info'],
  ['bm.command.bminfo.playerstats', 'Allows seeing player statistics, amount of bans, mutes etc'],
  ['bm.command.bminfo.connection', 'Allows seeing player\'s logged ip address'],
  ['bm.command.bminfo.ipstats', 'Allows seeing ip statistics such as amount of bans'],
  ['bm.command.bminfo.alts', 'Allows seeing possible alts, same output as /alts'],
  ['bm.command.bminfo.website', 'Displays link to players ban page, requires configuring within messages.yml'],
  ['bm.command.bminfo.others', 'Allows viewing other players information'],
  ['bm.command.banip', 'Allows you to ban an ip'],
  ['bm.command.banip.override', 'Allows overriding an existing ip ban'],
  ['bm.command.tempbanip', 'Allows you to tempban an ip'],
  ['bm.command.tempbanip.override', 'Allows overriding an existing ip ban'],
  ['bm.command.unbanip', 'Allows you to unban an ip'],
  ['bm.command.import', 'Allows importing of banned players and ips from banned-players.json and banned-ips.json files'],
  ['bm.command.kick', 'Allows you to kick another player'],
  ['bm.command.nlkick', 'Allows you to kick another player without logging it'],
  ['bm.command.mute', 'Allows you to mute a player'],
  ['bm.command.mute.offline', 'Required to permanently mute an offline player'],
  ['bm.command.mute.override', 'Allows you to override an existing mute'],
  ['bm.command.tempmute', 'Allows you to temp mute a player'],
  ['bm.command.tempmute.offline', 'Required to temporary mute an offline player'],
  ['bm.command.tempmute.override', 'Allows you to override an existing mute'],
  ['bm.command.unmute', 'Allows you to unmute a player'],
  ['bm.command.unmute.own', 'Allows a player to only unmute a player they muted'],
  ['bm.command.reload', 'Allows you to reload from the config'],
  ['bm.command.rollback', 'Allows rolling back staff actions'],
  ['bm.command.banname', 'Allows banning a name'],
  ['bm.command.banname.override', 'Allows overriding an existing name ban'],
  ['bm.command.tempbanname', 'Allows temporarily banning a name'],
  ['bm.command.tempbanname.override', 'Allows overriding an existing name ban'],
  ['bm.command.unbanname', 'Allows unbanning a name'],
  ['bm.exempt.kick', 'Online players with this permission cannot be kicked, highly recommended for admins'],
  ['bm.exempt.ban', 'Online players with this permission cannot be banned, highly recommended for admins'],
  ['bm.exempt.ban.override', 'Allows a player to ban an exempt player'],
  ['bm.exempt.tempban', 'Online players with this permission cannot be temporarily banned,highly recommended for admins'],
  ['bm.exempt.tempban.override', 'Allows a player to tempban an exempt player'],
  ['bm.exempt.mute', 'Online players with this permission cannot be muted, highly recommended for admins'],
  ['bm.exempt.mute.override', 'Allows a player to mute an exempt player'],
  ['bm.exempt.tempmute', 'Online players with this permission cannot be temporarily muted, highly recommended for admins'],
  ['bm.exempt.tempmute.override', 'Allows a player to tempmute an exempt player'],
  ['bm.exempt.banip', 'Online players with this permission cannot be ip banned, highly recommended for admins'],
  ['bm.exempt.banip.override', 'Allows a player to ip ban an exempt player'],
  ['bm.exempt.tempbanip', 'Online players with this permission cannot be temporarily banned, highly recommended for admins'],
  ['bm.exempt.warn', 'Online players with this permission cannot be warned'],
  ['bm.exempt.tempwarn', 'Online players with this permission cannot be temporarily warned'],
  ['bm.notify.ban', 'Notified when a player is permanently banned'],
  ['bm.notify.tempban', 'Notified when a player is temporarily banned'],
  ['bm.notify.unban', 'Notified when a player is unbanned'],
  ['bm.notify.banip', 'Notified when an ip is permanently banned'],
  ['bm.notify.tempbanip', 'Notified when an ip is temporarily banned'],
  ['bm.notify.unipban', 'Notified when an ip is unbanned'],
  ['bm.notify.mute', 'Notified when a player is permanently muted'],
  ['bm.notify.muted', 'Shows attempted messages from muted players'],
  ['bm.notify.tempmute', 'Notified when a player is temporarily muted'],
  ['bm.notify.unmute', 'Notified when a player is unmuted'],
  ['bm.notify.muteip', 'Notified when an ip is permanently muted'],
  ['bm.notify.mutedip', 'Shows attempted messages from muted ips'],
  ['bm.notify.tempmuteip', 'Notified when an ip is temporarily muted'],
  ['bm.notify.unmuteip', 'Notified when an ip is unmuted'],
  ['bm.notify.baniprange', 'Notified when an ip range is permanently banned'],
  ['bm.notify.tempbaniprange', 'Notified when an ip range is temporarily banned'],
  ['bm.notify.unbaniprange', 'Notified when an ip range is unbanned'],
  ['bm.notify.kick', 'Notified when a player is kicked'],
  ['bm.notify.reports', 'Notified when a player is reported'],
  ['bm.notify.reports.open', 'Displays open reports on server join'],
  ['bm.notify.reports.assigned', 'Displays assigned reports on server join'],
  ['bm.notify.warn', 'Notified when a player is warned'],
  ['bm.notify.tempwarn', 'Notified when a player is temporarily warned'],
  ['bm.notify.duplicateips', 'Notified when a player with the same ip address of a banned player joins'],
  ['bm.notify.notes', 'Notified when a note is created for a player'],
  ['bm.notify.notes.join', 'Displays all notes associated with a player who joined the server'],
  ['bm.notify.denied.player', 'Notified when a banned player attempts to join'],
  ['bm.notify.denied.ip', 'Notified when a player attempts to join from a banned ip address'],
  ['bm.notify.banname', 'Notified when a name is permanently banned'],
  ['bm.notify.tempbanname', 'Notified when a name is temporarily banned'],
  ['bm.notify.unbanname', 'Notified when a name is unbanned'],
  ['bm.timelimit.playerBans.bypass', 'Allows a player to bypass any group limitations on temporary ban lengths'],
  ['bm.timelimit.playerMutes.bypass', 'Allows a player to bypass any group limitations on temporary mute lengths'],
  ['bm.timelimit.ipBans.bypass', 'Allows a player to bypass any group limitations on temporary ban lengths'],
  ['bm.timelimit.ipMutes.bypass', 'Allows a player to bypass any group limitations on temporary mute lengths'],
  ['bm.timelimit.rollbacks.bypass', 'Allows a player to bypass any group limitations on rollback lengths'],
  ['bm.timelimit.nameBans.bypass', 'Allows a player to bypass any group limitations on temporary name lengths'],
  ['bm.command.report', 'Allows reporting a player'],
  ['bm.command.reports', 'Allows access to report management'],
  ['bm.command.report.offline', 'Allows reporting an offline player'],
  ['bm.command.reports.assign', 'Assign a report to yourself'],
  ['bm.command.reports.assign.other', 'Assign a report to another player'],
  ['bm.command.reports.close', 'Close a report'],
  ['bm.command.reports.list', 'List assigned reports'],
  ['bm.command.reports.list.others', 'List all reports'],
  ['bm.command.reports.teleport', 'Teleport to a player report location'],
  ['bm.command.reports.unassign', 'Unassign a report']
]

export default permissions
