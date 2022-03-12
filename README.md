# EuterpeBot

EuterpeBot – A Discord Bot for Playing Music in a Voice Channel

BACKGROUND

This bot accepts both a search query or a URL, and scours YouTube to find the most applicable video. It extracts the audio from this video and then plays it back in the voice channel of the user that queried it, so discord users can enjoy their favorite songs while calling their friends! This bot is written in JavaScript, specifically to make use of the dependencies yt-search and ytdl-core, which finds the YouTube video based on the query. It also uses FFMpeg to extract the audio that is then played back in the call. At present, this bot is hosted using the free online hosting service Heroku. Unfortunately because of this, latency presents an issue for the bot, and as such, videos over 5 minutes long are not recommended for this bot.

COMMANDS

$play <search or URL> - This is the main command to use the music feature, this adds the song to a query to be played when it has been reached

$p <search or URL> - This command is the same as the one above, but shorthand for ease of use 

$skip - This stops playback of the current song and moves to the next one in the queue

$stop - Completely clears the queue and forces the bot out of the voice channel

$clear - This command deletes 100 messages from the channel that it is invoked in, use this feature ONLY to clean up a dedicated music text channel

$help - Lists these commands in case you forget!

$info - Shows some background info on the bot itself

CREDIT
  
This project was coded exclusively by me: https://github.com/nikdorgan

LICENCE
  
Due to YouTube’s terms of service, EuterpeBot is not public, only useful for private, non-commercial use, and because of this the code is not licensed. If you would like to use EuterpeBot, you are free to make use of my code! 
