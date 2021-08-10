const questions = (t) => [
  {
    key: 1,
    header: `How does Placifull work?`,
    answer: `Every user can publish a listing, which then will be displayed to the public. 
    These will be freely accessable to the audience of the world wide web. Before publishing a listing
    you will need to purchase the option to put it on our web page. This can be done from profile page, where you 
    can see four purchase options.`,
  },
  {
    key: 2,
    header: `How can I put my listing on Placifull?`,
    answer: `You need to have a options that allows you to place the listing. You have three options from which to 
    choose. First option is a single post, you buy it and use it when ever it  is most suitable. This option will not expiry.
    Second and third option has an expiry date and limited quantities. These determines how many active listings you can
    have with this particular option. Once they expiry, you can add them again. You can delete them and input them again as many times
    as you want.`,
  },
  {
    key: 3,
    header: `How is the payment protected?`,
    answer: `We use Stripe in order to process the payment. The fields which ask for your card information are
    components from Stripe, so Placifull does not actuall have the access to your full card information`,
  },
  {
    key: 4,
    header: `My card was charged but nothing purchased?`,
    answer: `There could be times when your card was charged but nothing was actually been purchased. We are aware that
    there could happen some unexpected results. In this case please contact us by email or whatsapp stating what is the issue. 
    If we will see appropriatly to refund the money will be doing that ASAP.`,
  },
  {
    key: 5,
    header: `Why did my listing disapeared?`,
    answer: `The listing will apear in the system for 30 days unless you have bought an extended option which allows 
    the listing to be active in the system for far longer than 30 days. `,
  },
  {
    key: 6,
    header: `I bought the promoted feature, but I don't see my listing?`,
    answer: `Once you have purchased the promoted option your listing will have the chanse to be displayed on the main page. 
    The system takes all listings which have the promoted tag added and randomly will select which to display on the screen. `,
  },
  {
    key: 7,
    header: `How can I withdraw my referral bonuses?`,
    answer: `Once you have reached 25 € you are able to withdraw this from your account. In order to do that please contact 
    and we will transfer the money to your bank account. `,
  },
];

export default questions;
