import React from 'react';

const Map: React.FC = () => {
    return (
        <div className='w-full h-[450px] my-2'>
            <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.644458023128!2d106.72775897515783!3d10.838497189314042!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527d12f10cc51%3A0x1bd0ff026e6eb37f!2zxJAuIFPhu5EgNDkvMyBI4bq7bSA0NiDEkC4gNDksIEtodSBQaOG7kSA3LCBUaOG7pyDEkOG7qWMsIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1744968016767!5m2!1svi!2s"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
            />
        </div>
    );
};

export default Map;