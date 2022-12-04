# EuterpeBot

EuterpeBot – A Discord Bot for Playing Music in a Voice Channel

This bot accepts a query and scours YouTube to find the most applicable video or playlist. It extracts the audio from the videos it finds and then plays it back in the voice channel of the user that queried it, so discord users can enjoy their favorite videos while calling their friends! This bot is written entirely in JavaScript, and makes use of the dependencies yt-search and playdl to find the YouTube videos based on the query. It then uses ffmpeg and opus to extract the audio and play it back in the call.

This project was coded exclusively by me: https://github.com/nikdorgan


COMMANDS

$play URL  ($p) - Add video or playlist from the given URL to the queue.

$play words  ($p) - Search for a track on YouTube.

$queue  ($q) - Display the queue of the current tracks (up to 25).

$nowplaying  ($np) - Display the currently playing track.

$skip  ($s) - Remove the currently playing track from the queue.

$voteskip  ($v) - Vote to skip the current track. Must have at least 50% of the votes.

$stop  ($st) - Stop the player and clear the queue.

$repeat  ($rep) - Change to repeat mode.

$shuffle  ($sh) - Shuffle queue (works best for larger queues).

$restart - Restart the currently playing track.

$help - Show bot commands.


LICENCE
  
Due to YouTube’s terms of service, EuterpeBot is not public, only useful for private, non-commercial use, and because of this the code is not licensed. If you would like to use EuterpeBot, you are free to make use of my code!