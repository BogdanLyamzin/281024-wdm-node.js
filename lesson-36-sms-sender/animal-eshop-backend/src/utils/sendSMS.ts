import twilio from "twilio";

const { TWILIO_ACCOUNT_SID, TWILIO_AUT_TOKEN, TWILIO_PHONE_NUMBER } =
  process.env;

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUT_TOKEN);

interface ISMSData {
  body: string;
  to: string;
}

const sendSMS = async (data: ISMSData) => {
  const sms = { ...data, from: TWILIO_PHONE_NUMBER };
  await twilioClient.messages.create(sms);
};

export default sendSMS;
