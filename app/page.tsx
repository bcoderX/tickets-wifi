// 'use client'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
export default function Home() {

  // useLayoutEffect(()=>{
  //   const preloader = document.querySelector('#preloader');
  // if (preloader) {
  //     preloader.remove();
  // }
  // })
  return (
   
  <body className="index-page" data-bs-spy="scroll" data-bs-target="#navmenu">

    {/* ======= Header ======= */}
    <header id="header" className="bg-white fixed-top d-flex align-items-center">
        <div className="container-fluid d-flex align-items-center justify-content-between">

            <a href="" className="logo d-flex align-items-center me-auto me-xl-0">
                {/* Uncomment the line below if you also wish to use an image logo */}
                <Image width={90} height={90} src="/images/LogoMark.png" alt=""/>
                <h1>Latouch Numeric</h1>
                <span>.</span>
            </a>

            {/* Nav Menu */}
            <nav id="navmenu" className="navmenu">
                <ul>
                    <li><a href="#hero" className="active">Accueil</a></li>
                    <li><a href="#about">A propos</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>

                <i className="mobile-nav-toggle d-xl-none bi bi-list"></i>
            </nav>{/* End Nav Menu */}

            <a className="btn btn-primary" href="#about">Se connecter</a>

        </div>
    </header>{/* End Header */}

    <main id="main">

        {/* Hero Section - Home Page */}
        <section id="hero" className="hero">

            <img src="assets/img/hero-bg.jpg" alt="" data-aos="fade-in" />

            <div className="container">
                <div className="row">
                    <div className="col-lg-10">
                        <h2 data-aos="fade-up" data-aos-delay="100">Bienvenue sur <span>Latouch Numeric</span></h2>
                        <p data-aos="fade-up" data-aos-delay="200">Ici vous pouvez automatiser la vente de vos tickets wifizone</p>
                    </div>
                    <div className="col-lg-5 text-center">
                        <div data-aos="fade-up roc" data-aos-delay="300" >
                            <Link className="btn btn-primary p-3 m-2  border border-white" href={"/auth/sign-up"}>Cr&eacute;er un compte</Link>
                            <Link className="rounded bg-white p-3 m-2  border border-white hover:text-black" href={"/auth/login"}>Se connecter </Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>{/* End Hero Section */}

      
        {/* Faq Section - Home Page */}
        <section id="about" className="faq">

            <div className="container">

                <div className="row gy-4">

                    <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
                        <div className="content px-xl-5">
                            <h3><span>Frequently Asked </span><strong>Questions</strong></h3>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-8" data-aos="fade-up" data-aos-delay="200">

                        <div className="faq-container">
                            <div className="faq-item faq-active">
                                <h3><span className="num">1.</span> <span>Non consectetur a erat nam at lectus urna duis?</span></h3>
                                <div className="faq-content">
                                    <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className="faq-item">
                                <h3><span className="num">2.</span> <span>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</span></h3>
                                <div className="faq-content">
                                    <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className="faq-item">
                                <h3><span className="num">3.</span> <span>Dolor sit amet consectetur adipiscing elit pellentesque?</span></h3>
                                <div className="faq-content">
                                    <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className="faq-item">
                                <h3><span className="num">4.</span> <span>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</span></h3>
                                <div className="faq-content">
                                    <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                            <div className="faq-item">
                                <h3><span className="num">5.</span> <span>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</span></h3>
                                <div className="faq-content">
                                    <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>{/* End Faq item*/}

                        </div>

                    </div>
                </div>

            </div>

        </section>{/* End Faq Section */}


        {/* Call-to-action Section - Home Page */}
        <section id="call-to-action" className="call-to-action">

            <img src="assets/img/cta-bg.jpg" alt="" />

            <div className="container">
                <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                    <div className="col-xl-10">
                        <div className="text-center">
                            <h3>Call To Action</h3>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a className="cta-btn" href="#">Call To Action</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>{/* End Call-to-action Section */}

        {/* Contact Section - Home Page */}
        <section id="contact" className="contact">
            {/*  Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Contact</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>{/* End Section Title */}

            <div className="container" data-aos="fade-up" data-aos-delay="100">

                <div className="row gy-4">

                    <div className="col-lg-6">

                        <div className="row gy-4">
                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="200">
                                    <i className="bi bi-geo-alt"></i>
                                    <h3>Address</h3>
                                    <p>A108 Adam Street</p>
                                    <p>New York, NY 535022</p>
                                </div>
                            </div>{/* End Info Item */}

                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="300">
                                    <i className="bi bi-telephone"></i>
                                    <h3>Call Us</h3>
                                    <p>+1 5589 55488 55</p>
                                    <p>+1 6678 254445 41</p>
                                </div>
                            </div>{/* End Info Item */}

                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="400">
                                    <i className="bi bi-envelope"></i>
                                    <h3>Email Us</h3>
                                    <p>info@example.com</p>
                                    <p>contact@example.com</p>
                                </div>
                            </div>{/* End Info Item */}

                            <div className="col-md-6">
                                <div className="info-item" data-aos="fade" data-aos-delay="500">
                                    <i className="bi bi-clock"></i>
                                    <h3>Open Hours</h3>
                                    <p>Monday - Friday</p>
                                    <p>9:00AM - 05:00PM</p>
                                </div>
                            </div>{/* End Info Item */}

                        </div>

                    </div>

                    <div className="col-lg-6">
                        <form action="" method="post" className="php-email-form" data-aos="fade-up" data-aos-delay="200">
                            <div className="row gy-4">

                                <div className="col-md-6">
                                    <input type="text" name="name" className="form-control" placeholder="Your Name" required />
                                </div>

                                <div className="col-md-6 ">
                                    <input type="email" className="form-control" name="email" placeholder="Your Email" required />
                                </div>

                                <div className="col-md-12">
                                    <input type="text" className="form-control" name="subject" placeholder="Subject" required />
                                </div>

                                <div className="col-md-12">
                                    <textarea className="form-control" name="message" rows={6} placeholder="Message" required ></textarea>
                                </div>

                                <div className="col-md-12 text-center">
                                    <div className="loading">Loading</div>
                                    <div className="error-message"></div>
                                    <div className="sent-message">Your message has been sent. Thank you!</div>

                                    <button type="submit">Send Message</button>
                                </div>

                            </div>
                        </form>
                    </div>{/* End Contact Form */}

                </div>

            </div>

        </section > {/* End Contact Section */}

    </main >

    {/* ======= Footer ======= */}
    < footer id="footer" className="footer" >

        <div className="container footer-top">
            <div className="row gy-4">
                <div className="col-lg-5 col-md-12 footer-about">
                    <a href="index.html" className="logo d-flex align-items-center">
                        <span>Latouch Numeric</span>
                    </a>
                    <p>Cras fermentum odio eu feugiat lide par naso tierra. Justo eget nada terra videa magna derita valies darta donna mare fermentum iaculis eu non diam phasellus.</p>
                    <div className="social-links d-flex mt-4">
                        <a href=""><i className="bi bi-twitter"></i></a>
                        <a href=""><i className="bi bi-facebook"></i></a>
                        <a href=""><i className="bi bi-instagram"></i></a>
                        <a href=""><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                    <h4>Useful Links</h4>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About us</a></li>
                        <li><a href="#">Services</a></li>
                        <li><a href="#">Terms of service</a></li>
                        <li><a href="#">Privacy policy</a></li>
                    </ul>
                </div>

                <div className="col-lg-2 col-6 footer-links">
                    <h4>Our Services</h4>
                    <ul>
                        <li><a href="#">Web Design</a></li>
                        <li><a href="#">Web Development</a></li>
                        <li><a href="#">Product Management</a></li>
                        <li><a href="#">Marketing</a></li>
                        <li><a href="#">Graphic Design</a></li>
                    </ul>
                </div>

                <div className="col-lg-3 col-md-12 footer-contact text-center text-md-start">
                    <h4>Contact Us</h4>
                    <p>A108 Adam Street</p>
                    <p>New York, NY 535022</p>
                    <p>United States</p>
                    <p className="mt-4"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
                    <p><strong>Email:</strong> <span>info@example.com</span></p>
                </div>

            </div>
        </div>

        <div className="container copyright text-center mt-4">
            <p>&copy; <span>Copyright</span> <strong className="px-1">Latouch Numeric</strong> <span>All Rights Reserved</span></p>
           
        </div>

    </footer > {/* End Footer */}

    {/* Scroll Top Button */}
    <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>

    {/* Preloader */}
    <div id="preloade">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>

    {/* Vendor JS Files */}
    <script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" defer></script>
    <script src="/assets/vendor/glightbox/js/glightbox.min.js" defer></script>
    <script src="/assets/vendor/purecounter/purecounter_vanilla.js" defer></script>
    <script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" defer></script>
    <script src="/assets/vendor/aos/aos.js" defer></script>
    {/* <script src="/assets/vendor/php-email-form/validate.js"></script> */}

    {/* Template Main JS File */}
    <script src="/assets/js/main.js" defer></script>

</body >
  )
}
