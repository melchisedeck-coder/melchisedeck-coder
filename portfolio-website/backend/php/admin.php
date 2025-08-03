<?php
// Simple admin interface to view contact messages
session_start();

$admin_password = 'admin123'; // Change this in production!
$authenticated = isset($_SESSION['admin_authenticated']) && $_SESSION['admin_authenticated'] === true;

// Handle login
if (isset($_POST['password'])) {
    if ($_POST['password'] === $admin_password) {
        $_SESSION['admin_authenticated'] = true;
        $authenticated = true;
    } else {
        $error = 'Invalid password';
    }
}

// Handle logout
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: admin.php');
    exit();
}

// Function to read messages
function getMessages() {
    $messages = [];
    $file = 'contact_messages.txt';
    
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $lines = explode("\n", trim($content));
        
        foreach ($lines as $line) {
            if (!empty($line)) {
                $message = json_decode($line, true);
                if ($message) {
                    $messages[] = $message;
                }
            }
        }
    }
    
    return array_reverse($messages); // Show newest first
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio Admin - Contact Messages</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #f5f7fa;
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
        }
        
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .login-form {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            max-width: 400px;
            margin: 100px auto;
            text-align: center;
        }
        
        .form-group {
            margin-bottom: 20px;
            text-align: left;
        }
        
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: 600;
        }
        
        input[type="password"] {
            width: 100%;
            padding: 12px;
            border: 2px solid #e2e8f0;
            border-radius: 5px;
            font-size: 16px;
        }
        
        .btn {
            background: #667eea;
            color: white;
            padding: 12px 24px;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            display: inline-block;
        }
        
        .btn:hover {
            background: #5a6fd8;
        }
        
        .btn-logout {
            background: #e53e3e;
        }
        
        .btn-logout:hover {
            background: #c53030;
        }
        
        .error {
            color: #e53e3e;
            margin-bottom: 20px;
            padding: 10px;
            background: #fed7d7;
            border-radius: 5px;
        }
        
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }
        
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            text-align: center;
        }
        
        .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #667eea;
        }
        
        .messages {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        
        .message {
            padding: 20px;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .message:last-child {
            border-bottom: none;
        }
        
        .message-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .message-info {
            font-weight: 600;
            color: #2d3748;
        }
        
        .message-time {
            color: #718096;
            font-size: 0.9em;
        }
        
        .message-subject {
            font-size: 1.1em;
            font-weight: 600;
            color: #667eea;
            margin-bottom: 10px;
        }
        
        .message-content {
            color: #4a5568;
            line-height: 1.6;
            background: #f7fafc;
            padding: 15px;
            border-radius: 5px;
            white-space: pre-wrap;
        }
        
        .no-messages {
            text-align: center;
            padding: 40px;
            color: #718096;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (!$authenticated): ?>
            <div class="login-form">
                <h2>Admin Login</h2>
                <p>Enter password to view contact messages</p>
                
                <?php if (isset($error)): ?>
                    <div class="error"><?php echo htmlspecialchars($error); ?></div>
                <?php endif; ?>
                
                <form method="POST">
                    <div class="form-group">
                        <label for="password">Password:</label>
                        <input type="password" id="password" name="password" required>
                    </div>
                    <button type="submit" class="btn">Login</button>
                </form>
            </div>
        <?php else: ?>
            <div class="header">
                <h1>Contact Messages</h1>
                <a href="?logout=1" class="btn btn-logout">Logout</a>
            </div>
            
            <?php
            $messages = getMessages();
            $total_messages = count($messages);
            $today_messages = count(array_filter($messages, function($msg) {
                return date('Y-m-d', strtotime($msg['timestamp'])) === date('Y-m-d');
            }));
            ?>
            
            <div class="stats">
                <div class="stat-card">
                    <div class="stat-number"><?php echo $total_messages; ?></div>
                    <div>Total Messages</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number"><?php echo $today_messages; ?></div>
                    <div>Today's Messages</div>
                </div>
            </div>
            
            <div class="messages">
                <?php if (empty($messages)): ?>
                    <div class="no-messages">
                        <h3>No messages yet</h3>
                        <p>Contact form submissions will appear here.</p>
                    </div>
                <?php else: ?>
                    <?php foreach ($messages as $message): ?>
                        <div class="message">
                            <div class="message-header">
                                <div class="message-info">
                                    <?php echo htmlspecialchars($message['name']); ?> 
                                    &lt;<?php echo htmlspecialchars($message['email']); ?>&gt;
                                </div>
                                <div class="message-time">
                                    <?php echo date('M j, Y g:i A', strtotime($message['timestamp'])); ?>
                                </div>
                            </div>
                            <div class="message-subject">
                                <?php echo htmlspecialchars($message['subject']); ?>
                            </div>
                            <div class="message-content">
                                <?php echo htmlspecialchars($message['message']); ?>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php endif; ?>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>