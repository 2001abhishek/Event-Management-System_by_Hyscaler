<?php
$servername = "localhost";
$username = "root";
$password = "Bapun@7381";
$dbname = "event_management";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve and sanitize event parameter
$event = isset($_GET['event']) ? trim($_GET['event']) : '';

if ($event) {
    // Prepare and execute query
    $stmt = $conn->prepare("SELECT firstName, lastName, email FROM registrations WHERE event = ?");
    $stmt->bind_param("s", $event);
    $stmt->execute();
    $result = $stmt->get_result();

    // Check and display results
    if ($result->num_rows > 0) {
        echo "<ul>";
        while ($row = $result->fetch_assoc()) {
            echo "<li>" . htmlspecialchars($row["firstName"]) . " " . htmlspecialchars($row["lastName"]) . " (" . htmlspecialchars($row["email"]) . ")</li>";
        }
        echo "</ul>";
    } else {
        echo "No participants found.";
    }

    // Close statement
    $stmt->close();
} else {
    echo "Invalid event specified.";
}

// Close connection
$conn->close();
?>
