<?php
    get_header();
  ?>
  
<article>
  <?php
  if(have_post()) {

    while(have_post()) {
    the_post();
    get_template_part('template-parts/content', 'page');
  }
}
?>

</article>
