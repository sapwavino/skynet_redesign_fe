<template>
  <div class="policies-container rounded-2xl">
    <!--  TAB PICKERS-->
    <ul
        class="mb-1 flex flex-wrap font-medium text-center text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 mx-auto"
    >
      <li>
        <router-link
            :to="`/policies?tab=privacy`"
            class="inline-block p-4 rounded-t-lg"
            :class="{ 'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900': currentTab === 'privacy' }">
          Privacy Policy
        </router-link>
      </li>
      <li>
        <router-link :to="`/policies?tab=refund`" class="inline-block p-4 rounded-t-lg"
                     :class="{ 'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900': currentTab === 'refund' }">
          Refund Policy
        </router-link>
      </li>
      <li>
        <router-link :to="`/policies?tab=tos`" class="inline-block p-4 rounded-t-lg"
                     :class="{ 'text-customGold font-bold bg-gray-800 active dark:bg-customGold dark:text-gray-900': currentTab === 'tos' }">
          Terms of Service
        </router-link>
      </li>
    </ul>

    <div class="policy-content">
      <div
          v-if="currentTab === 'privacy'" class="flex flex-col gap-y-5 mt-5 dark:text-gray-500">
        <h2 class="header text-center">Privacy Policy</h2>
        <p>Skynet has created this privacy statement in order to demonstrate our commitment to privacy to our customers
          and users of this website and the services offered by Skynet. This Privacy Policy governs the manner in which
          Skynet. (Skynet) uses, maintains and discloses information collected from its customers and users of its
          website.</p>
        <p>
          <strong class="text-2xl capitalize">Information we collect</strong>
          <br/>
          Skynet may request or collect personal information from online users in a variety of ways, including through
          online forms for requesting information or ordering products and services, and other instances where users are
          invited to volunteer such information. Some of the data we collect is information that identifies you
          personally, and may include your name, e-mail address, postal address and telephone, payment account
          information, and other information necessary to provide the services requested. Skynet also maintains a record
          of contacts for customer or technical support.

          Skynet may also collect information about how users access the website through log files and the use of
          cookies, and through third party services such as Mouseflow and Google Analytics. Such information may include
          standard information from your web browser (such as browser type and language), your Internet Protocol (“IP”)
          address, and the actions you take on Skynet‘s Web sites (such as the web pages viewed and the links clicked)
        </p>
        <p>
          <strong class="text-2xl capitalize">What are cookies?</strong>
          <br/>
          Your Internet browser has the in-built facility for storing small text files - "cookies" - that hold
          information which allows a website to recognize your account.
          A cookie is a piece of data stored on the user's computer tied to information about the user. We may use both
          session ID cookies and persistent cookies. For session ID cookies, once you close your browser or log out, the
          cookie terminates and is erased. A persistent cookie is a small text file stored on your computer's hard drive
          for an extended period of time. Your browser's help file contains information and instructions for removing
          persistent cookies. Session ID cookies may be used by Skynet to track user preferences while the user is
          visiting the website. They also help to minimize load times and save on server processing. Persistent cookies
          may be used by Skynet to store whether, for example, you want your password remembered or not, and other
          information. Cookies used on the Skynet website do not contain personally identifiable information.
          More information about cookies can be found at this link
        </p>
        <p>
          <strong class="text-2xl capitalize">Log Files</strong>
          <br/>
          Like most standard websites, we use log files. This information may include internet protocol (IP) addresses,
          browser type, internet service provider (ISP), referring/exit pages, platform type, date/time stamp, and
          number of clicks to analyze trends, administer the site, track user's movement in the aggregate, and gather
          broad demographic information for aggregate use. However, none of the information stored in our log files,
          including but not limited to IP addresses, is linked to personally identifiable information.
        </p>
        <p>
          <strong class="text-2xl capitalize">How we Use and Share this information</strong>
          <br/>
          Skynet may use and share your personal information in order to provide the services requested. For example,
          your information may be provided to the domain registrar in order to process domain registrations, or with the
          relevant certificate authority to order an SSL certificate on your behalf. We will also share your information
          to the extent necessary to comply with ICANN's rules, regulations, and policies, and if your domains are not
          set to private registration, the publicly available WHOIS registry will contain personal information,
          including but not limited to your title, first name, surname, domain name, e-mail address, country, and phone
          number.

          Skynet is required to supply some of your personal data in order to request an SSL certificate from the
          certificate authority. By submitting a request for an SSL certificate order or renewal through Skynet, you
          consent to Skynet releasing all required personal information to the certificate authority in order to fulfill
          the request and you acknowledge and understand that Skynet acts only as an intermediary between the customer
          and the certificate authority, in order to facilitate the order or renewal of the certificate. Skynet has no
          influence on the outcome of an SSL certificate request and cannot guarantee that any request for an SSL
          certificate order or renewal will be granted.

          Skynet may also use the personally identifiable information collected by Skynet to contact customers regarding
          products and services offered by Skynet and, to the extent the user has agreed to it, by its trusted
          affiliates, independent contractors and business partners. We may also use this information and share it with
          trusted third parties for research purposes regarding the effectiveness of our website services, marketing,
          advertising and sales efforts, including, without limitation, for purposes of customer reviews (such as for
          the utilization of programs like Google Seller Ratings). Skynet will not sell or otherwise share this
          information with a third party for a third party marketing purposes, unless you specifically authorize such
          information sharing.

          Skynet may also disclose aggregate, anonymous data based on information collected from users to investors and
          potential partners. In such cases, only statistical information will be disclosed and personally identifiable
          data will be kept strictly confidential. In case Skynet is sold, the information collected from users may be
          transferred to the new owners.

          Skynet may from time to time engage third parties, including its own subsidiaries and affiliated companies, to
          preserve, analyze or otherwise store or manipulate data received by Skynet from its customers. In all such
          cases, third party service providers will be required to treat all such data with the same degree of care as
          Skynet and they will be prohibited from disclosing such data to any other person or party, except as otherwise
          provided for in this Privacy Policy.

          Skynet uses payment account information solely to check the financial qualifications of prospective Customers
          and to collect payment for the services provided by Skynet.
        </p>
        <p>
          <strong class="text-2xl capitalize">Your Responsibility</strong>
          <br/>
          You are responsible for the security of your Customer ID and passwords. Make sure you keep them in a safe
          place and do not share them with others. Always remember to log out after your session ends to ensure that
          others cannot access your private personal information. You should take this precaution even if you are not
          using a public computer, such as at a library or internet café, but even when using your private computer in
          your home. You are also responsible for keeping your contact and payment information up to date. You may
          update or change your registration information by logging into the Skynet Client Area. Certain information
          must be retained by Skynet, even after termination of your account, in order for Skynet to be able to provide
          the services requested, comply with its legal obligations, or to allow Skynet to resolve disputes or enforce
          its agreements.
        </p>
        <p>
          <strong class="text-2xl capitalize">Compliance with Laws and Law Enforcement</strong>
          <br/>
          We cooperate with government and law enforcement officials to enforce and comply with the law. We will
          disclose any information about Users upon valid request by government or law officials as we, in our sole
          discretion, believe necessary or appropriate to respond to claims and legal process (including without
          limitation subpoenas), to protect your property and rights, or the property and rights of a third party, to
          protect the safety of the public or any person, or stop activity we consider illegal or unethical.
        </p>
        <p>
          <strong class="text-2xl capitalize">Changes to this Privacy Statement</strong>
          <br/>
          Skynet reserves the right to change this Privacy Policy at any time, and such changes will be posted to the
          Skynet website


        </p>
      </div>
      <div
          v-if="currentTab === 'refund'" class="flex flex-col gap-y-5 mt-5 dark:text-gray-500">
        <h2 class="header text-center">Refund Policy</h2>
        <p class="muteSmallSubheader">
          Skynet will process all refund requests in accordance with this Policy
        </p>
        <p>
          <strong class="text-2xl capitalize">Refund eligibility</strong>
          <br/>
          Service(s) must be cancelled before a refund can be issued.
          Only first-time accounts are eligible for a refund. For example, if you've had an account with us before,
          canceled and signed up again, or if you have opened a second account with us, you will not be eligible for a
          refund. Violations of this Agreement will waive your rights under the refund policy.
          Skynet does not offer refunds for cancellations that occur after thirty (30) days.
          You will not be entitled to a refund if your use of product or service has been flagged as suspicious, is
          considered to be registered for improper use, or is registered in breach of our Terms of Service.
          <br/>

          You will not be entitled to a refund if your service is suspended or terminated as a result of a breach of our
          Terms of Service.
          <br/>
          All eligible refunds will be credited to your client account with Skynet, unless you specifically request for
          a cash refund. Money refunded into your client account can be used at anytime to pay for other products and
          services. You can view your credit balance by logging into your client account and going to the "Balance
          Wallet" section on your client area dashboard.
          <br/>

          If you have requested for a cash refund, Skynet will only give such refund where the account details you have
          provided for the refund are an exact match with that from which we received your payment. In event of any
          discrepancy in the account details, eligible refund will only be made into your client account.

          <br/>
          Requests for cash refunds will be processed and completed within a minimum of 3 days and maximum of 7 days
          from the date of request. All cash refund requests are subject to an administrative fee which will be deducted
          from the amount to be refunded to you. In the event that the amount to be refunded is less than the
          administrative fee i.e bank charges, you will only be entitled to a refund into your client account.
          <br/>
          All refund will be made via online transfers and Skynet is not responsible for any additional charges.
          On no account will the same product or service be entitled to a refund more than once.
          <br/>
          Annual shared hosting and reseller hosting purchases must be cancelled within 30 days of purchase to be
          eligible for a full refund.
          <br/>
          Cancellation requests for monthly, quarterly, and semi-annual web hosting plans must be made within 72 hours
          of purchase to be eligible for a refund.
          <br/>
          The money-back guarantee does not apply to most add-on products, given the unique nature of their costs.
          To Cancel your Hosting Follow this steps:
        </p>
        <ul class="list-disc flex flex-col gap-2">
          <li>Login to your client area and click on the Dashboard -> My Services</li>
          <li>Click on the View Details button beside the service you would like to cancel</li>
          <li>Click on Management Actions tab and then click on Request Cancellation link</li>
          <li>You will receive an automatic reply confirming we have your request.</li>
          <li>Wait for a separate cancellation-confirmation email (up to 48 hours later).</li>
          <li>Reply back to the cancellation-confirmation email and ask for your refund.</li>
          <li>You must get written confirmation from Skynet with the amount of your refund and requesting your account
            details.
          </li>
          <li>Please allow up to 3 working days for your account to be refunded.</li>
        </ul>
        <p>
          <strong class="text-2xl capitalize">Non-refundable Products and Services.</strong>
          <br/>
          The following products and services are non-refundable once purchased:
        </p>
        <ol class="list-decimal list-inside">
          <li>Email Hosting</li>
          <li>VPS or Virtual Servers</li>
          <li>Dedicated Servers</li>
          <li>Installation/setup for custom software or products</li>
          <li>Custom services purchases</li>
          <li>Web Design</li>
          <li>SSL</li>
        </ol>
        <p>In the event of unsuccessful registration or transfer of a domain name, the fees will be credited into your
          client area account. Refund for services that has not yet been installed or setup will be as well credited
          into your client area account and this may be used to either repurchase the same service or other
          services.</p>
        <p>
          <strong class="text-2xl capitalize">Overpayment</strong>
          <br/>
          If we become aware that you have overpaid for any product or service, we will credit the amount of that
          overpayment to your Client Area account where you can use it to pay for other products or services at any
          time. You will be able to see this credit by logging into your account and going to the Available credit
          section on your client area dashboard.

          If you wish for an overpayment to be refunded to your bank account, you must send a request for refund to
          support@skynet.africa. The request must give required details including the invoice number for which the
          overpayment was made, date of payment, method of payment (including, where applicable, bank details from which
          payment was made) and amount of overpayment.
          Once we have received your request, it will be dealt with in accordance with this Refund Policy.
        </p>
      </div>
      <div
          v-if="currentTab === 'tos'" class="flex flex-col gap-y-5 mt-5 dark:text-gray-500">
        <h2 class="header text-center">Terms of Service</h2>

        <div class="container mx-auto p-4 dark:text-gray-500">
          <h1 class="text-2xl font-bold mb-4">Terms and Conditions</h1>
          <section class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">Policies and Agreements</h2>
            <p class="mb-2">
              As a precondition and requirement to use the services available via Skynet, you, for yourself and for
              the company or other person(s), if any, you represent, hereby accept and agree to be legally bound by
              these Terms of Service. If you do not agree to abide by the terms of this Agreement, you are not
              authorized to use or access the Services.
            </p>
            <p class="mb-2">
              Additional policies and agreements include:
            </p>
            <ul class="list-disc list-inside mb-2">
              <li>Privacy Policy</li>
              <li>Refund Policy</li>
              <li>Email Hosting Agreement</li>
              <li>Cloud Hosting Agreement</li>
            </ul>
            <p class="mb-2">
              Additional terms may also apply to certain Services and are incorporated by reference herein as
              applicable. For example, if you register a VPS with us, then the VPS Agreement will also apply to you
              and would be incorporated herein.
            </p>
          </section>

          <section class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">Account Eligibility</h2>
            <p class="mb-2">
              By registering for or using the Services, you represent and warrant that:
            </p>
            <ul class="list-disc list-inside mb-2">
              <li>You are eighteen (18) years of age or older. The Services are intended solely for Users who are
                eighteen (18) years of age or older. Any registration, use of, or access to the Services by anyone
                under eighteen (18) is unauthorized and is a violation of this Agreement.
              </li>
              <li>If you use the Services on behalf of another party, you agree that you are authorized to bind such
                other party to this Agreement and to act on such other party's behalf with respect to any actions you
                take in connection with the Services.
              </li>
            </ul>
          </section>

          <section class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">Transfers</h2>
            <p class="mb-2">
              Our Transfers Team will make every effort to help you move your website to us. Transfers are provided as
              a courtesy service. We do not make any guarantees regarding the availability, possibility, or time
              required to complete an account transfer. Each hosting company is configured differently, and some
              hosting platforms save data in an incompatible or proprietary format, which may make it extremely
              difficult, if not impossible, to migrate some or all account data. In some cases, we may not be able to
              assist you in a transfer of data from an old host.
            </p>
            <p class="mb-2">
              The free transfer service is available for thirty (30) days from your sign-up date. Transfers outside of
              the thirty (30) day period will incur a charge; please contact a member of our Transfers department to
              receive a price quote. In no event shall Skynet be held liable for any lost or missing data or files
              resulting from a transfer to or from Skynet. You are solely responsible for backing up your data in all
              circumstances.
            </p>
          </section>

          <section class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">Prohibited Uses</h2>
            <h3 class="text-xl font-semibold mb-2">Infringement of Intellectual Property Rights</h3>
            <p class="mb-2">
              Use of the Services to infringe upon another party's intellectual property rights is prohibited. This
              includes, but is not limited to, the unauthorized copying or distribution of movies, music, books,
              photographs, software/warez, or any other copyrighted work. Selling or offering to sell any counterfeit
              merchandise will result in the immediate termination of your account, including the client area.
            </p>
            <p class="mb-2">
              Any account found to be infringing on the intellectual property rights of others will be expeditiously
              removed or access to the material will be disabled. Any account found to be in repeated violation of
              this prohibition will be suspended or terminated. If you believe that your intellectual property rights
              are being infringed upon, please email support@skynet.africa. For copyright infringement claims, Skynet
              follows the Digital Millennium Copyright Act ("DMCA") notice and takedown procedures.
            </p>
            <h3 class="text-xl font-semibold mb-2">Using a Shared Account as a Backup/Storage Device</h3>
            <p class="mb-2">
              You may not use a shared hosting account as a backup/storage device with the exception of one cPanel
              backup of the same account. Please do not take backups of your backups.
            </p>
          </section>

          <section class="mb-6">
            <h2 class="text-2xl font-semibold mb-2">Reseller Responsibilities</h2>
            <p class="mb-2">
              Skynet will hold any reseller responsible for any of their client's actions that violate the law or this
              Agreement. Skynet is not responsible for the acts or omissions of our resellers. The reseller hereby
              agrees to indemnify Skynet from and against any and all claims made by any User arising from the
              reseller's acts or omissions.
            </p>
            <p class="mb-2">
              Skynet reserves the right to revise our Reseller Program at any time. Changes shall take effect when
              posted online or on any subsequent date as may be set forth by Skynet.
            </p>
          </section>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from 'vue-router';
import {computed} from 'vue';

export default {
  name: 'Policies',
  setup() {
    const route = useRoute();
    const currentTab = computed(() => route.query.tab || 'privacy');
    return {currentTab};
  },

};
</script>

<style>
.policies-container {
  display: flex;
  flex-direction: column; /* Ensure content flows vertically */
  width: 80%; /* Adjust as needed */
  margin: 20px auto; /* Center the container */
  padding: 20px;

}

.tabs a {
  padding: 10px 15px;
  margin: 0 5px;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s; /* Smooth transition for hover effect */
  font-weight: bolder;
}

.policy-content h2 {
  margin-bottom: 10px;
}

.policy-content div {
  /* Style your policy text  */
  line-height: 1.6; /* Improve readability */
}

/* Responsive adjustments (example) */
@media (max-width: 768px) {
  .policies-container {
    width: 95%; /* Adjust width on smaller screens */
    padding: 10px;
  }

  .tabs a {
    margin: 5px 0; /* Add margin between stacked tabs */
    width: 100%; /* Make tabs occupy full width */
    text-align: center; /* Center tab text */
  }
}
</style>