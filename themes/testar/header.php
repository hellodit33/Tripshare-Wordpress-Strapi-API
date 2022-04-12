<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Cabin:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">

    <?php
    wp_head();
    ?>

</head>
<body>


  <div class="container">
 

  

    <?php

wp_nav_menu(
    array(
       'menu' => 'primary', 
       'container' => '',
       'theme_location' => 'primary',
       'items_wrap' => '<ul id="" class="">%3$s</ul>'
    )
);

?>


    <div class="header">
      <div class="top-left">

      
<?php
       if(function_exists('the_custom_logo')){
         

         $custom_logo_id=get_theme_mod('custom_logo');
         $logo= wp_get_attachment_image_src($custom_logo_id);
       }
?>
        <?php $permalink = get_permalink( $id ); ?>

        <a href="/"><img src="<?php echo $logo[0] ?>" alt="logo" loading="lazy" style="width: 60%; margin-top: 20px;"></a>
        
        </div>
      <div class="top-right" style="padding: 10px; color: black;">
        <a style="color: black;" href="login.html"><i class="fa fa-user-circle" style="font-size: 25px; padding: 8px;"></i></a>
        </div>
    </div>
    
  
  </div>