import { useEffect } from 'react';

export default function NewsletterSection() {
  useEffect(() => {
    // Load MailerLite script
    const script = document.createElement('script');
    script.src = 'https://groot.mailerlite.com/js/w/webforms.min.js?v176e10baa5e7ed80d35ae235be3d5024';
    script.type = 'text/javascript';
    document.body.appendChild(script);

    // Load Google reCAPTCHA
    const recaptchaScript = document.createElement('script');
    recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
    document.body.appendChild(recaptchaScript);

    // Fetch MailerLite token
    fetch('https://assets.mailerlite.com/jsonp/1805237/forms/166045655311058813/takel');

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
      if (document.body.contains(recaptchaScript)) {
        document.body.removeChild(recaptchaScript);
      }
    };
  }, []);

  return (
    <section className="py-16 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,92,53,0.03),transparent_70%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6">
        <div 
          id="mlb2-31101892" 
          className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-31101892 bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border-2 border-gray-200"
        >
          <style dangerouslySetInnerHTML={{ __html: `
            @import url("https://assets.mlcdn.com/fonts.css?version=1758197");
            
            /* LOADER */
            .ml-form-embedSubmitLoad {
              display: inline-block;
              width: 20px;
              height: 20px;
            }

            .g-recaptcha {
              transform: scale(1);
              -webkit-transform: scale(1);
              transform-origin: 0 0;
              -webkit-transform-origin: 0 0;
            }

            .sr-only {
              position: absolute;
              width: 1px;
              height: 1px;
              padding: 0;
              margin: -1px;
              overflow: hidden;
              clip: rect(0,0,0,0);
              border: 0;
            }

            .ml-form-embedSubmitLoad:after {
              content: " ";
              display: block;
              width: 11px;
              height: 11px;
              margin: 1px;
              border-radius: 50%;
              border: 4px solid #fff;
              border-color: #ffffff #ffffff #ffffff transparent;
              animation: ml-form-embedSubmitLoad 1.2s linear infinite;
            }
            @keyframes ml-form-embedSubmitLoad {
              0% {
                transform: rotate(0deg);
              }
              100% {
                transform: rotate(360deg);
              }
            }
            
            #mlb2-31101892.ml-form-embedContainer {
              box-sizing: border-box;
              display: table;
              margin: 0 auto;
              position: static;
              width: 100% !important;
              padding: 32px;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper {
              background-color: transparent !important;
              border-width: 0px;
              border-color: transparent;
              border-radius: 4px;
              border-style: solid;
              box-sizing: border-box;
              display: inline-block !important;
              margin: 0;
              padding: 0;
              position: relative;
              width: 100% !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper.embedForm {
              max-width: 100% !important;
              width: 100% !important;
              display: block !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper {
              display: block !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-align-center {
              text-align: center !important;
              width: 100% !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody {
              padding: 20px 0 0 0;
              display: flex !important;
              flex-direction: row !important;
              align-items: flex-start !important;
              gap: 32px !important;
              width: 100% !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody.ml-form-embedBodyHorizontal {
              padding-bottom: 0;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent {
              flex: 0 0 auto !important;
              text-align: left;
              margin: 0;
              min-width: 260px;
              max-width: 350px;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent h4 {
              color: #1e293b;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-size: 24px;
              font-weight: 400;
              margin: 0 0 10px 0;
              text-align: left;
              word-break: break-word;
              line-height: 1.3;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent p {
              color: #64748b;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              margin: 0;
              text-align: left;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody form {
              flex: 1 1 auto !important;
              margin: 0 !important;
              width: 100% !important;
              min-width: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              max-width: none !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-formContent {
              margin: 0 0 16px 0 !important;
              width: 100% !important;
              display: flex !important;
              flex-direction: column !important;
              gap: 16px !important;
              flex: 1 1 auto !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-row {
              display: flex !important;
              flex-direction: row !important;
              gap: 12px !important;
              width: 100% !important;
              flex: 1 1 auto !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-fieldRow {
              flex: 1 1 auto !important;
              margin: 0 !important;
              min-width: 0 !important;
              display: flex !important;
              flex-direction: column !important;
              width: 100% !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-row .ml-form-fieldRow {
              flex: 1 1 calc(50% - 6px) !important;
              min-width: 140px !important;
              max-width: none !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-fieldRow .ml-field-group {
              width: 100% !important;
              display: flex !important;
              flex-direction: column !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
              margin: 0;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
              text-align: left!important;
            }

            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
              margin-bottom: 5px;
              color: #334155;
              font-size: 13px;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-weight: bold;
              font-style: normal;
              text-decoration: none;
              display: block;
              line-height: 20px;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea {
              background-color: #ffffff !important;
              color: #333333 !important;
              border-color: #e2e8f0;
              border-radius: 8px !important;
              border-style: solid !important;
              border-width: 2px !important;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-size: 14px !important;
              height: 44px !important;
              min-height: 44px !important;
              line-height: 21px !important;
              margin-bottom: 0;
              margin-top: 0;
              margin-left: 0;
              margin-right: 0;
              padding: 10px 12px !important;
              width: 100% !important;
              box-sizing: border-box !important;
              max-width: 100% !important;
              transition: all 0.3s ease !important;
              resize: none !important;
              overflow: hidden !important;
              flex: 1 1 auto !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea {
              height: 44px !important;
              min-height: 44px !important;
              resize: none !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:focus,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea:focus {
              outline: none !important;
              border-color: #ff5c35 !important;
              box-shadow: 0 0 0 3px rgba(255, 92, 53, 0.1) !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-webkit-input-placeholder,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-webkit-input-placeholder {
              color: #94a3b8;
            }

            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-moz-placeholder,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-moz-placeholder {
              color: #94a3b8;
            }

            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-ms-input-placeholder,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-ms-input-placeholder {
              color: #94a3b8;
            }

            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-moz-placeholder,
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-moz-placeholder {
              color: #94a3b8;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea::-webkit-input-placeholder {
              color: #94a3b8;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
              margin: 0 !important;
              margin-top: 16px !important;
              width: 100% !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
              background-color: #ff5c35 !important;
              border: none !important;
              border-radius: 12px !important;
              box-shadow: 0 4px 6px rgba(255, 92, 53, 0.2) !important;
              color: #ffffff !important;
              cursor: pointer;
              font-family: 'Times New Roman', Times, serif !important;
              font-size: 16px !important;
              font-weight: 700 !important;
              line-height: 21px !important;
              height: 44px !important;
              min-height: 44px !important;
              padding: 12px 28px !important;
              width: 100% !important;
              box-sizing: border-box !important;
              transition: all 0.3s ease !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
              display: none;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
              background-color: #215c9a !important;
              transform: translateY(-2px);
              box-shadow: 0 6px 12px rgba(33, 92, 154, 0.3) !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-recaptcha {
              margin-top: 0 !important;
              margin-bottom: 20px !important;
              float: left !important;
              display: block !important;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
              padding: 20px 0 0 0;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
              text-align: left;
              margin: 0 0 20px 0;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
              color: #000000;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-size: 30px;
              font-weight: 400;
              margin: 0 0 10px 0;
              text-align: left;
              word-break: break-word;
            }
            
            #mlb2-31101892.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
              color: #000000;
              font-family: 'Open Sans', Arial, Helvetica, sans-serif;
              font-size: 14px;
              font-weight: 400;
              line-height: 20px;
              margin: 0 0 10px 0;
              text-align: left;
            }
            
            @media only screen and (max-width: 768px) {
              #mlb2-31101892.ml-form-embedContainer {
                padding: 24px;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody {
                flex-direction: column !important;
                gap: 24px !important;
                align-items: stretch !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent {
                min-width: 100% !important;
                text-align: center !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent h4 {
                text-align: center !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedContent p {
                text-align: center !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-formContent {
                flex-direction: column !important;
                gap: 12px !important;
                align-items: stretch !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-fieldRow {
                width: 100% !important;
                min-width: 100% !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-row {
                flex-direction: column !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-row .ml-form-fieldRow {
                flex: 1 1 100% !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedSubmit {
                width: 100% !important;
                margin-top: 16px !important;
              }
              
              #mlb2-31101892.ml-form-embedContainer .ml-form-embedBody .ml-form-embedSubmit button {
                width: 100% !important;
              }
            }
            
            @media only screen and (max-width: 400px) {
              .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup {
                width: 100%!important;
              }
              
              #mlb2-31101892.ml-form-embedContainer {
                padding: 16px;
              }
            }
          `}} />
          
          <div className="ml-form-align-center">
            <div className="ml-form-embedWrapper embedForm">
              <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
                <div className="ml-form-embedContent">
                  <h4>Sign up for our Newsletter</h4>
                  <p>Every week we share premium templates and strategies freelancers can use to level up their game. Join us and get the goodies delivered straight to your inbox.</p>
                </div>

                <form 
                  className="ml-block-form" 
                  action="https://assets.mailerlite.com/jsonp/1805237/forms/166045655311058813/subscribe" 
                  data-code="" 
                  method="post" 
                  target="_blank"
                >
                  <div className="ml-form-formContent">
                    {/* Row 1: First Name and Last Name */}
                    <div className="ml-form-row">
                      <div className="ml-form-fieldRow">
                        <div className="ml-field-group ml-field-name">
                          <label htmlFor="ml-field-name">First Name</label>
                          <textarea 
                            id="ml-field-name"
                            className="form-control" 
                            name="fields[name]" 
                            aria-label="name" 
                            maxLength={255} 
                            placeholder="Your first name"
                          />
                        </div>
                      </div>
                      
                      <div className="ml-form-fieldRow">
                        <div className="ml-field-group ml-field-lastname">
                          <label htmlFor="ml-field-lastname">Last Name</label>
                          <input 
                            id="ml-field-lastname"
                            type="text"
                            className="form-control" 
                            name="fields[lastname]" 
                            aria-label="last name" 
                            maxLength={255} 
                            placeholder="Your last name"
                            autoComplete="family-name"
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Row 2: Phone and Email */}
                    <div className="ml-form-row">
                      <div className="ml-form-fieldRow">
                        <div className="ml-field-group ml-field-phone ml-validate-required">
                          <label htmlFor="ml-field-phone">Phone</label>
                          <input 
                            id="ml-field-phone"
                            aria-label="phone" 
                            aria-required="true" 
                            type="text" 
                            className="form-control" 
                            data-inputmask="" 
                            name="fields[phone]" 
                            placeholder="Your phone number" 
                            autoComplete=""
                          />
                        </div>
                      </div>
                      
                      <div className="ml-form-fieldRow ml-last-item">
                        <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                          <label htmlFor="ml-field-email">Email</label>
                          <input 
                            id="ml-field-email"
                            aria-label="email" 
                            aria-required="true" 
                            type="email" 
                            className="form-control" 
                            data-inputmask="" 
                            name="fields[email]" 
                            placeholder="Your email address" 
                            autoComplete="email"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-form-recaptcha ml-validate-required" style={{ float: 'left' }}>
                    <style dangerouslySetInnerHTML={{ __html: `
                      .ml-form-recaptcha {
                        margin-bottom: 20px;
                      }
                      .ml-form-recaptcha.ml-error iframe {
                        border: solid 1px #ff0000;
                      }
                      @media screen and (max-width: 480px) {
                        .ml-form-recaptcha {
                          width: 220px!important
                        }
                        .g-recaptcha {
                          transform: scale(0.78);
                          -webkit-transform: scale(0.78);
                          transform-origin: 0 0;
                          -webkit-transform-origin: 0 0;
                        }
                      }
                    `}} />
                    <div className="g-recaptcha" data-sitekey="6Lf1KHQUAAAAAFNKEX1hdSWCS3mRMv4FlFaNslaD"></div>
                  </div>

                  <input type="hidden" name="ml-submit" value="1" />

                  <div className="ml-form-embedSubmit">
                    <button type="submit" className="primary">Subscribe</button>
                    <button 
                      disabled 
                      style={{ display: 'none' }} 
                      type="button" 
                      className="loading"
                    >
                      <div className="ml-form-embedSubmitLoad"></div>
                      <span className="sr-only">Loading...</span>
                    </button>
                  </div>

                  <input type="hidden" name="anticsrf" value="true" />
                </form>
              </div>

              <div className="ml-form-successBody row-success" style={{ display: 'none' }}>
                <div className="ml-form-successContent">
                  <h4>Thank you!</h4>
                  <p>You have successfully joined our subscriber list.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            function ml_webform_success_31101892() {
              var $ = ml_jQuery || jQuery;
              $('.ml-subscribe-form-31101892 .row-success').show();
              $('.ml-subscribe-form-31101892 .row-form').hide();
            }
          `
        }}
      />
    </section>
  );
}
