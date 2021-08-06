import TostifyCustomContainer from 'components/common/TostifyCustomContainer';
import { CommonServices } from 'services';

const useEmail = (t) => {
  const sendEmail = async (inputValues) => {
    try {
      let payload = {
        to: inputValues?.to,
        from: `[${inputValues.from}] <placifull@placifull.com>`,
        replyTo: inputValues?.replyTo,
        subject: inputValues?.subject,
        text: inputValues?.text,
        html: inputValues?.html,
      };
      const { data, error } = await CommonServices.SEND_EMAIL(payload);
      if (error) throw error?.message;

      TostifyCustomContainer(
        'success',
        t('common:toast.messages.success'),
        t('common:toast.email-send')
      );
    } catch (e) {
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.not-send')
      );
      TostifyCustomContainer(
        'error',
        t('common:toast.messages.error'),
        t('common:toast.contact-directly')
      );
    }
  };
  return [sendEmail];
};

export default useEmail;
