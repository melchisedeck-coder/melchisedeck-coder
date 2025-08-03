<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Method not allowed'
    ]);
    exit();
}

// Configuration
$config = [
    'to_email' => 'john@example.com',
    'from_email' => 'noreply@yourdomain.com',
    'from_name' => 'Portfolio Contact Form',
    'log_file' => 'contact_messages.txt',
    'rate_limit' => 5, // messages per hour per IP
];

// Rate limiting
function checkRateLimit($ip, $limit) {
    $log_file = 'rate_limit.txt';
    $current_time = time();
    $hour_ago = $current_time - 3600;
    
    // Read existing logs
    $logs = [];
    if (file_exists($log_file)) {
        $content = file_get_contents($log_file);
        $lines = explode("\n", trim($content));
        foreach ($lines as $line) {
            if (!empty($line)) {
                list($timestamp, $logged_ip) = explode('|', $line);
                if ($timestamp > $hour_ago) {
                    $logs[] = ['timestamp' => $timestamp, 'ip' => $logged_ip];
                }
            }
        }
    }
    
    // Count messages from this IP in the last hour
    $count = 0;
    foreach ($logs as $log) {
        if ($log['ip'] === $ip) {
            $count++;
        }
    }
    
    if ($count >= $limit) {
        return false;
    }
    
    // Log this request
    $logs[] = ['timestamp' => $current_time, 'ip' => $ip];
    
    // Write back to file (keep only last hour)
    $content = '';
    foreach ($logs as $log) {
        $content .= $log['timestamp'] . '|' . $log['ip'] . "\n";
    }
    file_put_contents($log_file, $content);
    
    return true;
}

// Get client IP
function getClientIP() {
    $ip_keys = ['HTTP_CLIENT_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'];
    foreach ($ip_keys as $key) {
        if (!empty($_SERVER[$key])) {
            $ip = $_SERVER[$key];
            if (strpos($ip, ',') !== false) {
                $ip = trim(explode(',', $ip)[0]);
            }
            if (filter_var($ip, FILTER_VALIDATE_IP, FILTER_FLAG_NO_PRIV_RANGE | FILTER_FLAG_NO_RES_RANGE)) {
                return $ip;
            }
        }
    }
    return $_SERVER['REMOTE_ADDR'] ?? 'unknown';
}

// Validation function
function validateInput($data) {
    $errors = [];
    
    // Name validation
    if (empty($data['name']) || strlen(trim($data['name'])) < 2) {
        $errors['name'] = 'Name is required and must be at least 2 characters';
    }
    
    // Email validation
    if (empty($data['email']) || !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = 'Valid email is required';
    }
    
    // Subject validation
    if (empty($data['subject']) || strlen(trim($data['subject'])) < 5) {
        $errors['subject'] = 'Subject is required and must be at least 5 characters';
    }
    
    // Message validation
    if (empty($data['message']) || strlen(trim($data['message'])) < 10) {
        $errors['message'] = 'Message is required and must be at least 10 characters';
    }
    
    return $errors;
}

// Sanitize input
function sanitizeInput($data) {
    return [
        'name' => htmlspecialchars(trim($data['name']), ENT_QUOTES, 'UTF-8'),
        'email' => filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL),
        'subject' => htmlspecialchars(trim($data['subject']), ENT_QUOTES, 'UTF-8'),
        'message' => htmlspecialchars(trim($data['message']), ENT_QUOTES, 'UTF-8')
    ];
}

// Log message
function logMessage($data, $ip) {
    $log_entry = [
        'timestamp' => date('Y-m-d H:i:s'),
        'ip' => $ip,
        'name' => $data['name'],
        'email' => $data['email'],
        'subject' => $data['subject'],
        'message' => $data['message']
    ];
    
    $log_line = json_encode($log_entry) . "\n";
    file_put_contents('contact_messages.txt', $log_line, FILE_APPEND | LOCK_EX);
}

// Send email
function sendEmail($data, $config) {
    $to = $config['to_email'];
    $subject = 'Portfolio Contact: ' . $data['subject'];
    
    $message = "
    <html>
    <head>
        <title>New Contact Form Submission</title>
    </head>
    <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> {$data['name']}</p>
        <p><strong>Email:</strong> {$data['email']}</p>
        <p><strong>Subject:</strong> {$data['subject']}</p>
        <p><strong>Message:</strong></p>
        <div style='background: #f5f5f5; padding: 15px; border-radius: 5px;'>
            " . nl2br($data['message']) . "
        </div>
        <hr>
        <p><small>Sent at: " . date('Y-m-d H:i:s') . "</small></p>
    </body>
    </html>
    ";
    
    $headers = [
        'MIME-Version: 1.0',
        'Content-type: text/html; charset=UTF-8',
        'From: ' . $config['from_name'] . ' <' . $config['from_email'] . '>',
        'Reply-To: ' . $data['email']
    ];
    
    return mail($to, $subject, $message, implode("\r\n", $headers));
}

try {
    // Get input data
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }
    
    // Check rate limiting
    $client_ip = getClientIP();
    if (!checkRateLimit($client_ip, $config['rate_limit'])) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => 'Too many requests. Please try again later.'
        ]);
        exit();
    }
    
    // Validate input
    $errors = validateInput($input);
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Validation failed',
            'errors' => $errors
        ]);
        exit();
    }
    
    // Sanitize input
    $data = sanitizeInput($input);
    
    // Log the message
    logMessage($data, $client_ip);
    
    // Try to send email
    $email_sent = sendEmail($data, $config);
    
    if (!$email_sent) {
        error_log('Failed to send contact form email');
    }
    
    // Return success response
    echo json_encode([
        'success' => true,
        'message' => 'Message sent successfully!',
        'data' => [
            'timestamp' => date('Y-m-d H:i:s'),
            'email_sent' => $email_sent
        ]
    ]);
    
} catch (Exception $e) {
    error_log('Contact form error: ' . $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Internal server error. Please try again later.'
    ]);
}
?>