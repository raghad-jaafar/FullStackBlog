import React from 'react'
import Logo from "../img/footer.png";
const Footer = () => {
  return (
      <footer>
  <div class="footer-left">
    <h3>LitHub</h3>
    <p class="about">Discover the best books, rate your favorites, and join our community of book lovers! Your opinions help others find their next great read.</p>
  </div>

  <div class="footer-center">
    <ul>
      <li><a href="#">Top Reviews</a></li>
      <li><a href="#">Recent Posts</a></li>
      <li><a href="#">Genres</a></li>
      <li><a href="#">Contact Us</a></li>
    </ul>
  </div>

  <div class="footer-right">
   
    <div class="social-icons">
      <a href="#"><i class="fab fa-facebook"></i></a>
      <a href="#"><i class="fab fa-twitter"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
    </div>
  </div>

  <div class="footer-bottom">
    <p>&copy; LitHub. All Rights Reserved.</p>
     <span>
        Made with <b>React.js</b>
      </span>
  </div>


     

    </footer>
  )
}

export default Footer
