import React from 'react'

const Footer = () => (
    <div className="section-footer">
    <div className="container-general w-container">
        <div className="footer-text">We’re here to help you move.<br />Mo - Fr: 07:30 - 21:00&nbsp;&nbsp; |&nbsp; Sa: 08:00 -
            18:00</div>
        <div className="columns-general footer w-row">
            <div className="column-centered footer-icons w-col w-col-6 w-col-small-6 w-col-tiny-tiny-stack"><a
                    href="tel:+493076758002" className="footer-link-icon w-inline-block"><img
                        src="/images/helpline.svg"
                        alt="" /></a><a href="tel:+493076758002" className="footer-link">+49 30 76758002</a></div>
            <div className="column-centered footer-icons w-col w-col-6 w-col-small-6 w-col-tiny-tiny-stack"><a
                    href="mailto:service@movinga.de" className="footer-link-icon w-inline-block"><img
                        src="/images/mail.svg"
                        alt="" /></a><a href="mailto:service@movinga.de" className="footer-link">service@movinga.de</a></div>
        </div>
        <div className="line"></div>
        <div className="columns-footer w-row">
            <div className="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 className="footer-links categories">Germany</h3><a href="https://www.movinga.de/uber-uns"
                    className="link-footer">Über uns<br /></a><a href="https://careers.movinga.com/"
                    className="link-footer">Karriere<br /></a><a href="https://www.movinga.de/bewertungen"
                    className="link-footer">Bewertungen<br /></a><a href="https://www.movinga.de/hub/"
                    className="link-footer">Blog<br /></a><a href="https://www.movinga.de/faq"
                    className="link-footer">Hilfe<br /></a>
            </div>
            <div className="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 className="footer-links categories">France</h3><a href="https://www.movinga.fr/a-propos"
                    className="link-footer">À propos de nous<br /></a><a href="https://careers.movinga.com/"
                    className="link-footer">Carrière<br /></a><a href="https://www.movinga.fr/avis-clients"
                    className="link-footer">Nos avis clients<br /></a><a href="https://www.movinga.fr/hub/"
                    className="link-footer">Blog<br /></a><a href="https://www.movinga.fr/faq"
                    className="link-footer">Aide<br /></a>
            </div>
            <div className="column-footer-text w-col w-col-4 w-col-small-4">
                <h3 className="footer-links categories">Sweden</h3><a href="https://www.movinga.se/om-oss"
                    className="link-footer">Om oss<br /></a><a href="https://careers.movinga.com/"
                    className="link-footer">Karriär<br /></a><a href="https://www.movinga.se/omdomen"
                    className="link-footer">Omdömen<br /></a><a href="https://www.movinga.se/hub/"
                    className="link-footer">Blogg<br /></a><a href="https://www.movinga.se/fragor-och-svar"
                    className="link-footer">Hjälp<br /></a>
            </div>
        </div>
        <div className="columns-cards w-row">
            <div className="column-general w-col w-col-2 w-col-small-2">
                <div className="text-light-footer gmbh">© 2020 Movinga GmbH</div>
            </div>
            <div className="column-general w-col w-col-2 w-col-small-2"><a href="/data-privacy-notice"
                    className="link-footer center">Data Privacy<br /></a></div>
            <div className="column-general w-col w-col-2 w-col-small-2"><a href="/imprint"
                    className="link-footer center">Imprint<br /></a></div>
            <div className="column-general w-col w-col-2 w-col-small-2"><a href="https://www.movinga.com/about-us"
                    className="link-footer center">About us<br /></a></div>
            <div className="column-card w-col w-col-4 w-col-small-4">
                <div className="text-light-footer gmbh">We accept :</div><img
                    src="/images/payment-methods.png"
                    alt="" className="image-12" />
            </div>
        </div>
    </div>
</div>
);

export default Footer;