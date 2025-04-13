<?php


//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require "PHPMailer/src/PHPMailer.php";
require "PHPMailer/src/SMTP.php";
require "PHPMailer/src/Exception.php";

//Create an instance; passing `true` enables exceptions

        

class Email {

    function enviarEmail($userEmail, $assuntoEmail, $corpoEmail, $corpoAltEmail) {
        
        $mail = new PHPMailer(true);
        
        try {
            //Server settings
            //$mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'anyges.contact@gmail.com';                     //SMTP username
            $mail->Password   =  'xjam phan ossu vtrl';                         //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
            $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
            //Recipients
            $mail->setFrom('anyges.contact@gmail.com', 'Anyges');
            $mail->addAddress($userEmail);     //Add a recipient
            $mail->addReplyTo('no-reply@anyges.com', 'Anyges');
            //$mail->addCC('cc@example.com');
            //$mail->addBCC('bcc@example.com');
        
            //Attachments
            //$mail->addAttachment('../imgs/logo-default.png', 'Anyges-Logo.png');
        
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->CharSet = 'UTF-8';
            $mail->Encoding = 'base64';
            $mail->Subject = "$assuntoEmail";
            $mail->Body    =  <<<END
                $corpoEmail
            END;
            $mail->AltBody = <<<END
                $corpoAltEmail
            END;
        
            $mail->send();
            //echo 'Message has been sent';
        } catch (Exception $e) {
            //echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    }


}

?>