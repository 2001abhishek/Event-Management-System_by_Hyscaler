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

// Check request method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve and sanitize input values
    $event = isset($_POST['event']) ? trim($_POST['event']) : null;
    $firstName = isset($_POST['firstName']) ? trim($_POST['firstName']) : null;
    $lastName = isset($_POST['lastName']) ? trim($_POST['lastName']) : null;
    $dob = isset($_POST['dob']) ? trim($_POST['dob']) : null;
    $email = isset($_POST['email']) ? trim($_POST['email']) : null;
    $mobile = isset($_POST['mobile']) ? trim($_POST['mobile']) : null;
    $gender = isset($_POST['gender']) ? trim($_POST['gender']) : null;
    $address = isset($_POST['address']) ? trim($_POST['address']) : null;
    $city = isset($_POST['city']) ? trim($_POST['city']) : null;
    $pincode = isset($_POST['pincode']) ? trim($_POST['pincode']) : null;
    $state = isset($_POST['state']) ? trim($_POST['state']) : null;

    // Validate required fields
    if ($event && $firstName && $lastName && $dob && $email && $mobile && $gender && $address && $city && $pincode && $state) {
        // Validate email
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "Error: Invalid email format.";
            exit();
        }

        // Validate mobile number
        if (!preg_match("/^\d{10}$/", $mobile)) {
            echo "Error: Mobile number should be 10 digits.";
            exit();
        }

        // Validate pincode
        if (!preg_match("/^\d{6}$/", $pincode)) {
            echo "Error: PIN Code should be 6 digits.";
            exit();
        }

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO registrations (event, firstName, lastName, dob, email, mobile, gender, address, city, pincode, state) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
        if (!$stmt) {
            echo "Error: " . $conn->error;
            exit();
        }
        $stmt->bind_param("sssssssssss", $event, $firstName, $lastName, $dob, $email, $mobile, $gender, $address, $city, $pincode, $state);

        // Execute and check
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close statement
        $stmt->close();
    } else {
        echo "Error: All fields are required.";
    }
} else {
    echo "Invalid request method.";
}

// Close connection
$conn->close();
?>
