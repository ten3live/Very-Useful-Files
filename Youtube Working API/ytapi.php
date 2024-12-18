<?php
header("Access-Control-Allow-Origin: *"); // Allow requests from all origins
header("Content-Type: application/xml"); // Ensure the response is XML

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['playlist_id'])) {
    $playlistId = $_GET['playlist_id'];

$url = "https://www.youtube.com/feeds/videos.xml?playlist_id=" . $playlistId;

// Fetch data from YouTube
$response = file_get_contents($url);

if ($response === FALSE) {
    http_response_code(500);
    echo "Error fetching YouTube data";
    exit;
}

// Output the YouTube data
echo $response;
}
?>

