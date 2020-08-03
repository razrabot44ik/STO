<?php

$connect = mysqli_connect("localhost", "root", "root", "bdsite");

$search_get = $_POST['poisk'];

$sql = "SELECT ^ FROM `tab_tab` WHERE `title` LIKE '%$search_get%' ";

$select = mysqli_query($connect, $sql);

while ($select_while = mysqli_fetch_assoc($select))  {
    ?>
    <br>
    <b><a href="/index.html?id=<?php echo $select_while['id']; ?>"><?php echo $select_while['title']; ?></a></b>

    <?php
}

?>
