/* eslint-disable max-len */
import nodemailer from 'nodemailer';
import Language from '../src/language/index';
import { mailTemplates } from '../src/enum/Email';

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.EMAIL_PASS
	}
});

class Email {

	static async sendtextMail(data, templateType) {
		const { lang, user } = data;
		user.templateType = templateType;
		user.lang = lang;
		const mailData = {
			from: process.env.EMAIL,
			to: user.email,
			subject: Language[ lang ].Mail.exerciseRemember,
			html: this.getTemplate(user)
		};
		let information = transporter.sendMail(mailData, (err, info) => {
			if (err) {
				console.log(err);
				return err;
			}
			return info;
		});

		return information;
	}

	static getTemplate(user) {
		const { lang, surname, templateType } = user;
		let templateFields = mailTemplates[ templateType ];
		templateFields = this.fillFields(templateType, lang, surname);

		return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
      <html lang="tr">
      <head>
          <title>MDP Group</title>
          <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="IE=edge" http-equiv="X-UA-Compatible" />
          <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,600,900&display=swap&subset=latin-ext" rel="stylesheet">
      </head>
      <body style="margin:0; padding:0;font-family: Source Sans Pro, sans-serif;font-size:15px;" bgcolor="#f2f2f2">
          <center>
              <table bgcolor="#f2f2f2" border="0" cellpadding="0" cellspacing="0" width="600" style="padding: 20px 200px">
                  <tbody>
                      <tr>
                          <td align="center" valign="center">
                              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="400" style="padding: 20px 30px">
                                <tbody>
                                  <tr>
                                  </tr>
                                </tbody>
                              </table>
                              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="400" style="padding: 20px 60px">
                                <tbody>
                                  <tr>
                                    <td align="center" valign="center">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="400">
                                <tbody>
                                  <tr>
                                    <td align="center" height="70" style="font-size:15px;padding: 15px 15px 0px 15px;" valign="center">
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                              <table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="400" style="border-left:2px solid #ffffff;border-right: 2px solid #ffffff;">
                                <tbody style="width: 200px">
                                  <tr>
                                    ${templateFields}
                                  </tr>
                                </tbody>
                              </table>
                          </td>
                      </tr>
                  </tbody>
              </table>
          </center>
      </body>
      </html>`;
	}

	static fillFields(templateType, lang, surname) {
		let templateFields = mailTemplates[ templateType ];
		let text;
		if (templateFields.name === 'remember') {
			text = (Language[ `${lang}` ].Mail.rememberText).replace('{{surname}}', surname);
		}
		let template = `
		<td align="center" height="70" style="font-size:17px;padding: 15px;" valign="center">
			<table bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="350" style="border-left:2px solid #ffffff;border-right: 2px solid #ffffff;">
				<tr>
					<td style="color: #354052;">
						${text}
						<br/><br/><br/><br/>
					</td>
				</tr>
			</table>
		</td>`;
		return template;
	}

}

export default Email;