// Le pasaremos variables de la venta y se construirà un HTML con la info de la venta
export const constructEmailGraciasPorTuCompra = (doc: any) => {
  let htmlContent = `<!doctype html>
    <html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office">
    
    <head>
        <title>&iexcl;Gracias por tu compra #${doc.id}!</title>
        <!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <!--<![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style type="text/css">
            #outlook a {
                padding: 0;
            }
    
            body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
            }
    
            table,
            td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
    
            img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
            }
    
            p {
                display: block;
                margin: 0;
            }
        </style>
        <!--[if mso]> <noscript><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript>
    <![endif]-->
        <!--[if lte mso 11]>
    <style type="text/css">
    .ogf{width:100% !important;}
    </style>
    <![endif]-->
        <style type="text/css">
            @media only screen and (min-width:599px) {
                .xc568 {
                    width: 568px !important;
                    max-width: 568px;
                }
    
                .xc536 {
                    width: 536px !important;
                    max-width: 536px;
                }
            }
        </style>
        <style media="screen and (min-width:599px)">
            .moz-text-html .xc568 {
                width: 568px !important;
                max-width: 568px;
            }
    
            .moz-text-html .xc536 {
                width: 536px !important;
                max-width: 536px;
            }
        </style>
        <style type="text/css">
            @media only screen and (max-width:598px) {
                table.fwm {
                    width: 100% !important;
                }
    
                td.fwm {
                    width: auto !important;
                }
            }
        </style>
        <style type="text/css">
            u+.emailify .gs {
                background: #000;
                mix-blend-mode: screen;
                display: inline-block;
                padding: 0;
                margin: 0;
            }
    
            u+.emailify .gd {
                background: #000;
                mix-blend-mode: difference;
                display: inline-block;
                padding: 0;
                margin: 0;
            }
    
            p {
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
            }
    
            u+.emailify a,
            #MessageViewBody a,
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
    
            td.b .klaviyo-image-block {
                display: inline;
                vertical-align: middle;
            }
    
            @media only screen and (max-width:599px) {
                .emailify {
                    height: 100% !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    width: 100% !important;
                }
    
                u+.emailify .glist {
                    margin-left: 1em !important;
                }
    
                td.ico.v>div.il>a.l.m,
                td.ico.v .mn-label {
                    padding-right: 0 !important;
                    padding-bottom: 16px !important;
                }
    
                td.x {
                    padding-left: 0 !important;
                    padding-right: 0 !important;
                }
    
                .fwm img {
                    max-width: 100% !important;
                    height: auto !important;
                }
    
                .aw img {
                    width: auto !important;
                    margin-left: auto !important;
                    margin-right: auto !important;
                }
    
                .ah img {
                    height: auto !important;
                }
    
                td.b.nw>table,
                td.b.nw a {
                    width: auto !important;
                }
    
                td.stk {
                    border: 0 !important;
                }
    
                td.u {
                    height: auto !important;
                }
    
                br.sb {
                    display: none !important;
                }
    
                .thd-1 .i-thumbnail {
                    display: inline-block !important;
                    height: auto !important;
                    overflow: hidden !important;
                }
    
                .hd-1 {
                    display: block !important;
                    height: auto !important;
                    overflow: visible !important;
                }
    
                .ht-1 {
                    display: table !important;
                    height: auto !important;
                    overflow: visible !important;
                }
    
                .hr-1 {
                    display: table-row !important;
                    height: auto !important;
                    overflow: visible !important;
                }
    
                .hc-1 {
                    display: table-cell !important;
                    height: auto !important;
                    overflow: visible !important;
                }
    
                div.r.pr-16>table>tbody>tr>td,
                div.r.pr-16>div>table>tbody>tr>td {
                    padding-right: 16px !important
                }
    
                div.r.pl-16>table>tbody>tr>td,
                div.r.pl-16>div>table>tbody>tr>td {
                    padding-left: 16px !important
                }
    
                td.a.pt-16 {
                    padding-top: 16px !important;
                }
    
                td.a.pr-16 {
                    padding-right: 16px !important;
                }
    
                td.a.pb-16 {
                    padding-bottom: 16px !important;
                }
    
                td.a.pl-16 {
                    padding-left: 16px !important;
                }
            }
    
            @media (prefers-color-scheme:light) and (max-width:599px) {
                .ds-1.hd-1 {
                    display: none !important;
                    height: 0 !important;
                    overflow: hidden !important;
                }
            }
    
            @media (prefers-color-scheme:dark) and (max-width:599px) {
                .ds-1.hd-1 {
                    display: block !important;
                    height: auto !important;
                    overflow: visible !important;
                }
            }
        </style>
        <meta name="color-scheme" content="light dark">
        <meta name="supported-color-schemes" content="light dark">
        <!--[if gte mso 9]>
    <style>a:link,span.MsoHyperlink{mso-style-priority:99;color:inherit;text-decoration:none;}a:visited,span.MsoHyperlinkFollowed{mso-style-priority:99;color:inherit;text-decoration:none;}li{text-indent:-1em;}table,td,p,div,span,ul,ol,li,a{mso-hyphenate:none;}
    </style>
    <![endif]-->
        <!--[if mso]><!-- -->
        <style>
            .cr->table>tbody>tr>td,
            .c-r>table {
                border-collapse: collapse;
            }
        </style>
        <!--<![endif]-->
    </head>
    
    <body lang="en" link="#DD0000" vlink="#DD0000" class="emailify"
        style="mso-line-height-rule:exactly;mso-hyphenate:none;word-spacing:normal;background-color:#e6ebed;">
        <div class="bg" style="background-color:#e6ebed;" lang="en">
            <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
    <![endif]-->
            <div class="r  pr-16 pl-16"
                style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="background:#fffffe;background-color:#fffffe;width:100%;">
                    <tbody>
                        <tr>
                            <td style="border:none;direction:ltr;font-size:0;padding:16px 16px 16px 16px;text-align:left;">
                                <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:568px;">
    <![endif]-->
                                <div class="xc568 ogf c"
                                    style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="border:none;vertical-align:middle;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" class="i"
                                                    style="font-size:0;padding:0;word-break:break-word;">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style="border-collapse:collapse;border-spacing:0;">
                                                        <tbody>
                                                            <tr>
                                                                <td style="width:64px;"> <img alt
                                                                        src="https://res.cloudinary.com/stickycoverscloudinary/image/upload/v1682884358/Frame_6_9_d5220c4d2a.png"
                                                                        style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                                                        title width="64" height="auto">
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
    <![endif]-->
            <div class="r  pr-16 pl-16"
                style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="background:#fffffe;background-color:#fffffe;width:100%;">
                    <tbody>
                        <tr>
                            <td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
                                <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
    <![endif]-->
                                <div class="xc536 ogf c"
                                    style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="border:none;vertical-align:middle;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="center" class="x  m"
                                                    style="font-size:0;padding-bottom:8px;word-break:break-word;">
                                                    <div style="text-align:center;">
                                                        <p
                                                            style="Margin:0;text-align:center;mso-line-height-alt:34px;mso-ansi-font-size:28px;">
                                                            <span
                                                                style="font-size:28px;font-family:League Spartan,Arial,sans-serif;font-weight:700;color:#073b4c;line-height:118%;mso-line-height-alt:34px;mso-ansi-font-size:28px;">&iexcl;Gracias
                                                                por tu compra!</span></p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" class="x  m"
                                                    style="font-size:0;padding-bottom:8px;word-break:break-word;">
                                                    <div style="text-align:center;">
                                                        <p
                                                            style="Margin:0;text-align:center;mso-line-height-alt:56px;mso-ansi-font-size:48px;">
                                                            <span
                                                                style="font-size:48px;font-family:League Spartan,Arial,sans-serif;font-weight:700;color:#aacc00;line-height:117%;mso-line-height-alt:56px;mso-ansi-font-size:48px;">#${
                                                                  doc.id
                                                                }</span>
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="center" class="x"
                                                    style="font-size:0;padding-bottom:0;word-break:break-word;">
                                                    <div style="text-align:center;">
                                                        <p
                                                            style="Margin:0;text-align:center;mso-line-height-alt:24px;mso-ansi-font-size:20px;">
                                                            <span
                                                                style="font-size:20px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:115%;mso-line-height-alt:24px;mso-ansi-font-size:20px;">Te
                                                                agradecemos por tu compra en nuestra tienda. Estamos
                                                                emocionados de enviarte los detalles de tu pedido.</span>
                                                        </p>
                                                        <p
                                                            style="Margin:0;mso-line-height-alt:24px;mso-ansi-font-size:20px;">
                                                            <span
                                                                style="font-size:20px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:115%;mso-line-height-alt:24px;mso-ansi-font-size:20px;">&nbsp;</span>
                                                        </p>
                                                        <p
                                                            style="Margin:0;mso-line-height-alt:24px;mso-ansi-font-size:20px;">
                                                            <span
                                                                style="font-size:20px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:115%;mso-line-height-alt:24px;mso-ansi-font-size:20px;">En
                                                                unas horas nos contactaremos contigo v&iacute;a WhatsApp
                                                                para coordinar el env&iacute;o/entrega de tus
                                                                stickers.</span></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
    <![endif]-->
            <div class="r  pr-16 pl-16"
                style="background:#e6ebed;background-color:#e6ebed;margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="background:#e6ebed;background-color:#e6ebed;width:100%;">
                    <tbody>
                        <tr>
                            <td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
                                <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook cr--outlook -outlook" style="vertical-align:middle;width:536px;">
    <![endif]-->
    
                                <div class="xc536 ogf c  cr-"
                                    style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%"
                                        style="border-collapse:separate;border-spacing:0;">
                                        <tbody>
                                            <tr>
                                                <td style="border-collapse:separate;border-spacing:0;background-color:#fffffe;border:none;border-radius:16px 16px 16px 16px;vertical-align:middle;padding:16px 16px 16px 16px;"
                                                    bgcolor="#fffffe" valign="middle">
                                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                                        style width="100%">
                                                        <tbody>
                                                            <!-- MAP  -->
                                                            ${doc?.items?.map(
                                                              (item) => {
                                                                return `<tr>
                                                                <td align="left" class="a pt-16 pr-16 pb-16 pl-16"
                                                                    style="background:#fffffe;font-size:0;padding:0;word-break:break-word;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        border="0"
                                                                        style="color:#000000;font-family:Arial,sans-serif;font-size:13px;line-height:22px;table-layout:fixed;width:100%;border:none;">
                                                                        <tr class="q ">
                                                                            <td align="center" class="u"
                                                                                style="padding:0;height:100px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="19.841269841269842%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="i  fwm" align="center"
                                                                                            width="100%"><img width="100"
                                                                                                height="auto"
                                                                                                style="display:block;width:63px;height:100px;"
                                                                                                src=${item.product.cover.url}>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="0.7936507936507936%">&#8203
                                                                            </td>
                                                                            <td align="left" class="u"
                                                                                style="padding:8px 8px 8px 8px;height:72px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="39.285714285714285%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  tm" align="left"
                                                                                            width="100%"
                                                                                            style="padding-bottom:4px;">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:14px;">
                                                                                                <span
                                                                                                    style="font-size:14px;font-family:League Spartan,Arial,sans-serif;font-weight:700;color:#073b4c;line-height:129%;mso-line-height-alt:18px;mso-ansi-font-size:14px;">${item.product.name}</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                    <tr>
                                                                                        <td class="x  " align="left"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:12px;">
                                                                                                <span
                                                                                                    style="font-size:12px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:133%;mso-line-height-alt:16px;mso-ansi-font-size:12px;">Cantidad:
                                                                                                    ${item?.quantity}</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="0.7936507936507936%">&#8203
                                                                            </td>
                                                                            <td align="right" class="u"
                                                                                style="padding:8px 8px 8px 8px;height:29px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="39.285714285714285%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="right"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:right;px;mso-ansi-font-size:14px;">
                                                                                                <span
                                                                                                    style="font-size:14px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:114%;mso-line-height-alt:16px;mso-ansi-font-size:14px;">$${item.product.price}
                                                                                                    MXN</span></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>              
                                                            <tr>
                                                                <td class="16"
                                                                    style="font-size:0;padding:0;word-break:break-word;">
                                                                    <div style="height:16px;line-height:16px;">&#8202;</div>
                                                                </td>
                                                            </tr>`;
                                                              }
                                                            )}
                                                            <!-- END OF MAP -->
    
                                                            
                                                            <tr>
                                                                <td align="center" class="d  m"
                                                                    style="font-size:0;padding:0;padding-bottom:16px;word-break:break-word;">
                                                                    <p
                                                                        style="border-top:solid 1px #e6ebed;font-size:1px;margin:0px auto;width:100%;">
                                                                    </p>
    
    
                                                                    <!--[if mso | IE]>
    <table align="center" border="0" cellpadding="0" cellspacing="0" style="border-top:solid 1px #e6ebed;font-size:1px;margin:0px auto;width:504px;" role="presentation" width="504px"><tr><td style="height:0;line-height:0;"> &nbsp;
    </td></tr></table>
    <![endif]-->
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td align="left" class="a pt-16 pr-16 pb-16 pl-16"
                                                                    style="background:transparent;font-size:0;padding:0;word-break:break-word;">
                                                                    <table cellpadding="0" cellspacing="0" width="100%"
                                                                        border="0"
                                                                        style="color:#000000;font-family:Arial,sans-serif;font-size:13px;line-height:22px;table-layout:fixed;width:100%;border:none;">
                                                                        <tr class="q ">
                                                                            <td align="left" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="left"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">Subtotal</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="1.5873015873015872%">&#8203
                                                                            </td>
                                                                            <td align="right" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="right"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:right;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">${
                                                                                                      doc?.subtotal
                                                                                                    }
                                                                                                    MXN</span></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class>
                                                                            <td class="s"
                                                                                style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;color:transparent;"
                                                                                aria-hidden="true">
                                                                                <div style="height:8px;line-height:8px;">
                                                                                    &#8203</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class="q ">
                                                                            <td align="left" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="left"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">Env&iacute;o</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="1.5873015873015872%">&#8203
                                                                            </td>
                                                                            <td align="right" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="right"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:right;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">${
                                                                                                      doc
                                                                                                        ?.shipping
                                                                                                        ?.shipment
                                                                                                        ?.total_pricing
                                                                                                    }
                                                                                                    MXN</span></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class>
                                                                            <td class="s"
                                                                                style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;color:transparent;"
                                                                                aria-hidden="true">
                                                                                <div style="height:8px;line-height:8px;">
                                                                                    &#8203</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class="q ">
                                                                            <td align="right" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="right"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">Descuento</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="1.5873015873015872%">&#8203
                                                                            </td>
                                                                            <td align="left" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="left"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:right;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">-$0.00
                                                                                                    MXN</span></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class>
                                                                            <td class="s"
                                                                                style="font-size:0;padding:0;padding-bottom:0;word-break:break-word;color:transparent;"
                                                                                aria-hidden="true">
                                                                                <div style="height:8px;line-height:8px;">
                                                                                    &#8203</div>
                                                                            </td>
                                                                        </tr>
                                                                        <tr class="q ">
                                                                            <td align="right" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="right"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:left;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:700;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">Total</span>
                                                                                            </p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                            <td class="tgtr"
                                                                                style="vertical-align:middle;color:transparent;font-size:0;"
                                                                                width="1.5873015873015872%">&#8203
                                                                            </td>
                                                                            <td align="left" class="u"
                                                                                style="padding:0;height:21px;word-wrap:break-word;vertical-align:middle;"
                                                                                width="49.20634920634921%">
                                                                                <table border="0" cellpadding="0"
                                                                                    cellspacing="0" width="100%">
                                                                                    <tr>
                                                                                        <td class="x  " align="left"
                                                                                            width="100%">
                                                                                            <p
                                                                                                style="Margin:0;text-align:right;px;mso-ansi-font-size:16px;">
                                                                                                <span
                                                                                                    style="font-size:16px;font-family:League Spartan,Arial,sans-serif;font-weight:700;color:#073b4c;line-height:131%;mso-line-height-alt:22px;mso-ansi-font-size:16px;">${
                                                                                                      doc?.total
                                                                                                    }
                                                                                                    MXN</span></p>
                                                                                        </td>
                                                                                    </tr>
                                                                                </table>
                                                                            </td>
                                                                        </tr>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td></tr></table>
    <table align="center" border="0" cellpadding="0" cellspacing="0" class="r-outlook -outlook pr-16-outlook pl-16-outlook -outlook" role="presentation" style="width:600px;" width="600"><tr><td style="line-height:0;font-size:0;mso-line-height-rule:exactly;">
    <![endif]-->
            <div class="r  pr-16 pl-16"
                style="background:#fffffe;background-color:#fffffe;margin:0px auto;max-width:600px;">
                <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                    style="background:#fffffe;background-color:#fffffe;width:100%;">
                    <tbody>
                        <tr>
                            <td style="border:none;direction:ltr;font-size:0;padding:32px 32px 32px 32px;text-align:left;">
                                <!--[if mso | IE]>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td class="c-outlook -outlook -outlook" style="vertical-align:middle;width:536px;">
    <![endif]-->
                                <div class="xc536 ogf c"
                                    style="font-size:0;text-align:left;direction:ltr;display:inline-block;vertical-align:middle;width:100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                        style="border:none;vertical-align:middle;" width="100%">
                                        <tbody>
                                            <tr>
                                                <td align="left" class="x" style="font-size:0;word-break:break-word;">
                                                    <div style="text-align:left;">
                                                        <p
                                                            style="Margin:0;text-align:left;mso-line-height-alt:24px;mso-ansi-font-size:20px;">
                                                            <span
                                                                style="font-size:20px;font-family:League Spartan,Arial,sans-serif;font-weight:400;color:#073b4c;line-height:115%;mso-line-height-alt:24px;mso-ansi-font-size:20px;">Si
                                                                tienes alguna duda, puedes contactarnos a trav&eacute;s de
                                                                nuestro correo stickycoversmx@gmail.com o a trav&eacute;s de
                                                                nuestro n&uacute;mero de WhatsApp +525554605902.</span></p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <!--[if mso | IE]>
    </td></tr></table>
    <![endif]-->
        </div>
    </body>
    
    </html>
  `;
  return htmlContent;
};
