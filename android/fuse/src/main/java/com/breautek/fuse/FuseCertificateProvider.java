
/*
Copyright 2023 Breautek

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

//import java.io.ByteArrayInputStream;
//import java.io.FileOutputStream;
//import java.math.BigInteger;
//import java.nio.file.Files;
//import java.nio.file.Path;
//import java.security.KeyPair;
//import java.security.KeyPairGenerator;
//import java.security.KeyStore;
//import java.security.NoSuchAlgorithmException;
//import java.security.Provider;
//import java.security.SecureRandom;
//import java.security.Security;
//import java.security.cert.X509Certificate;
//import java.time.Instant;
//import java.time.ZonedDateTime;
//import java.util.Date;
//import java.util.HexFormat;
//
//
//import org.bouncycastle.asn1.ASN1InputStream;
//import org.bouncycastle.asn1.ASN1Sequence;
//import org.bouncycastle.asn1.DERUTF8String;
//import org.bouncycastle.asn1.x500.AttributeTypeAndValue;
//import org.bouncycastle.asn1.x500.RDN;
//import org.bouncycastle.asn1.x500.X500Name;
//import org.bouncycastle.asn1.x500.style.BCStyle;
//import org.bouncycastle.asn1.x509.BasicConstraints;
//import org.bouncycastle.asn1.x509.Extension;
//import org.bouncycastle.asn1.x509.SubjectPublicKeyInfo;
//import org.bouncycastle.cert.X509v3CertificateBuilder;
//import org.bouncycastle.cert.bc.BcX509ExtensionUtils;
//import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter;
//import org.bouncycastle.jce.provider.BouncyCastleProvider;
//import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
//
//public class GenerateSelfSigned {
//
//    private static final Provider      BC_PROVIDER = new BouncyCastleProvider();
//    private static final SecureRandom  PRNG        = new SecureRandom();
//
//    public  static void main(final String[] args) throws Exception {
//
//        Security.insertProviderAt(BC_PROVIDER, 1);
//
//        final var keyPair     = getKeyPair("RSA", 4096);
//
//        final var x500subject = getSubject();
//        final var x509Cert    = getSelfSignedCert(keyPair, x500subject, Validity.ofYears(100), "SHA256WithRSA");
//        /*
//         * Load Certificate into freshly created Keystore...
//         */
//        final var pwChars     = "password".toCharArray();
//        final var keyStore    = getKeyStore("PKCS12", keyPair, pwChars, "alias", x509Cert);
//        /*
//         * Write Certificate & Keystore to disk...
//         */
//        final var fileName    = "self.signed.x509_" + HexFormat.of().toHexDigits(System.currentTimeMillis());
//
//        Files.write   (Path.of(             fileName +".cer"), x509Cert.getEncoded());
//
//        keyStore.store(new FileOutputStream(fileName +".p12"), pwChars);
//    }
//
//    private static KeyStore getKeyStore(final String keyStoreType, final KeyPair keyPair, final char[] pwChars, final String alias, final X509Certificate x509Cert) throws Exception {
//
//        final var keyStore = KeyStore.getInstance(keyStoreType);
//        ;         keyStore.load(null, pwChars);
//        ;         keyStore.setKeyEntry(alias, keyPair.getPrivate(), pwChars, new X509Certificate[] {x509Cert});
//
//        return    keyStore;
//    }
//
//    private static KeyPair getKeyPair(final String algorithm, final int keysize) throws NoSuchAlgorithmException {
//
//        final var keyPairGenerator = KeyPairGenerator.getInstance(algorithm, BC_PROVIDER);
//        ;         keyPairGenerator.initialize(keysize, PRNG);
//
//        return    keyPairGenerator.generateKeyPair();
//    }
//
//    private static  X500Name getSubject() {
//
//        return  new X500Name(new RDN[] {new RDN (
//                new AttributeTypeAndValue[] {
//
//                        new AttributeTypeAndValue(BCStyle.CN, new DERUTF8String("Common Name")),
//                        new AttributeTypeAndValue(BCStyle.OU, new DERUTF8String("Organisational Unit name")),
//                        new AttributeTypeAndValue(BCStyle.O,  new DERUTF8String("Organisation")),
//                        new AttributeTypeAndValue(BCStyle.L,  new DERUTF8String("Locality name")),
//                        new AttributeTypeAndValue(BCStyle.ST, new DERUTF8String("State or Province name")),
//                        new AttributeTypeAndValue(BCStyle.C,  new DERUTF8String("uk"))
//                }) });
//    }
//
//    private static X509Certificate getSelfSignedCert(final KeyPair keyPair, final X500Name subject, final Validity validity, final String signatureAlgorithm) throws Exception {
//
//        final var sn               = new BigInteger(Long.SIZE, PRNG);
//
//        final var issuer           = subject;
//
//        final var keyPublic        = keyPair  .getPublic();
//        final var keyPublicEncoded = keyPublic.getEncoded();
//        final var keyPublicInfo    = SubjectPublicKeyInfo.getInstance(keyPublicEncoded);
//        /*
//         * First, some fiendish trickery to generate the Subject (Public-) Key Identifier...
//         */
//        try(final var ist = new ByteArrayInputStream(keyPublicEncoded);
//            final var ais = new      ASN1InputStream(ist))
//        {
//            final var asn1Sequence         = (ASN1Sequence) ais.readObject();
//
//            final var subjectPublicKeyInfo = SubjectPublicKeyInfo.getInstance(asn1Sequence);
//            final var subjectPublicKeyId   = new BcX509ExtensionUtils().createSubjectKeyIdentifier(subjectPublicKeyInfo);
//
//            /*
//             * Now build the Certificate, add some Extensions & sign it with our own Private Key...
//             */
//            final var certBuilder          = new X509v3CertificateBuilder(issuer, sn, validity.notBefore, validity.notAfter, subject, keyPublicInfo);
//            final var contentSigner        = new  JcaContentSignerBuilder(signatureAlgorithm).build(keyPair.getPrivate());
//            /*
//             * BasicConstraints instantiated with "CA=true"
//             * The BasicConstraints Extension is usually marked "critical=true"
//             *
//             * The Subject Key Identifier extension identifies the public key certified by this certificate.
//             * This extension provides a way of distinguishing public keys if more than one is available for
//             * a given subject name.
//             */
//            final var certHolder           = certBuilder
//                    .addExtension(Extension.basicConstraints,     true,  new BasicConstraints(true))
//                    .addExtension(Extension.subjectKeyIdentifier, false, subjectPublicKeyId)
//                    .build(contentSigner);
//
//            return new JcaX509CertificateConverter().setProvider(BC_PROVIDER).getCertificate(certHolder);
//        }
//    }
//
//    private static final record Validity(Date notBefore, Date notAfter) {
//
//        private static Validity ofYears(final int count) {
//
//            final var zdtNotBefore = ZonedDateTime.now();
//            final var zdtNotAfter  = zdtNotBefore.plusYears(count);
//
//            return              of(zdtNotBefore.toInstant(), zdtNotAfter.toInstant());
//        }
//        private static Validity of(final Instant notBefore,  final Instant notAfter) {
//            return new Validity   (Date.from    (notBefore), Date.from    (notAfter));
//        }
//    }
//}

//
///*
//Copyright 2023 Breautek
//
//Licensed under the Apache License, Version 2.0 (the "License");
//you may not use this file except in compliance with the License.
//You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
//Unless required by applicable law or agreed to in writing, software
//distributed under the License is distributed on an "AS IS" BASIS,
//WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//See the License for the specific language governing permissions and
//limitations under the License.
//*/
//
package com.breautek.fuse;

import java.math.BigInteger;
import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;
import java.security.Provider;
import java.security.Security;
import java.security.cert.CertificateException;
import java.security.cert.X509Certificate;

import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.cert.jcajce.JcaX509CertificateConverter;
import org.bouncycastle.cert.jcajce.JcaX509v3CertificateBuilder;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.operator.ContentSigner;
import org.bouncycastle.operator.OperatorCreationException;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import java.util.Date;


public class FuseCertificateProvider {

    public static class FuseCertificate {
        public final KeyPair keypair;
        public final X509Certificate certificate;

        public final String signature;

        public FuseCertificate(KeyPair kp, X509Certificate cert, String sig) {
            keypair = kp;
            certificate = cert;
            signature = sig;
        }
    }

    private final int $keySize;

    public FuseCertificateProvider() {
        $keySize = 4096;
    }

    public void install() {
        // Replace the android with our imported version
        Security.removeProvider("BC");
        Security.addProvider(new BouncyCastleProvider()); // Add Bouncy Castle as a security provider
    }

    public String getSubjectCommonName() {
        return "Untitled";
    }

    public String getSubjectOrganizationUnit() {
        return "Untitled";
    }

    public String getSubjectCompany() {
        return "Untitled";
    }

    public String getSubjectLocation() {
        return "Untitled";
    }

    public String getSubjectState() {
        return "Untitled";
    }

    public String getSubjectCountry() {
        return "Untitled";
    }

    protected X500Name _getSubject(String signature) {
        StringBuilder sb = new StringBuilder();

        sb.append("CN=").append(getSubjectCommonName()).append(", ")
            .append("OU=").append(getSubjectOrganizationUnit()).append(", ")
            .append("O=").append(getSubjectCompany()).append(", ")
            .append("L=").append(getSubjectLocation()).append(", ")
            .append("ST=").append(getSubjectState()).append(", ")
            .append("C=").append(getSubjectCountry()).append(", ")
            .append("UID=").append(signature);

        return new X500Name(sb.toString());
    }

    public FuseCertificate generate() throws NoSuchAlgorithmException, CertificateException, OperatorCreationException {
        // Generate a self-signed X.509 certificate
        X509Certificate certificate = null;
        Date startDate = new Date();
        Date expiryDate = new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000L); // Validity for 1 year

        BigInteger serialNumber = BigInteger.valueOf(System.currentTimeMillis());

        String signature = FuseSecretGenerator.generate();

        X500Name issuerName = new X500Name("CN=Fuse, OU=Fuse, O=Breautek, L=Moncton, ST=NB, C=Canada");
        X500Name subjectName = this._getSubject(signature);

        KeyPairGenerator kpGenerator = KeyPairGenerator.getInstance("RSA");
        kpGenerator.initialize($keySize);

        KeyPair kp = kpGenerator.generateKeyPair();

        JcaX509v3CertificateBuilder certBuilder = new JcaX509v3CertificateBuilder(
                issuerName,
                serialNumber,
                startDate,
                expiryDate,
                subjectName,
                kp.getPublic()
        );

        ContentSigner contentSigner = new JcaContentSignerBuilder("SHA256WithRSA").build(kp.getPrivate());
        X509CertificateHolder certHolder = certBuilder.build(contentSigner);

        JcaX509CertificateConverter certificateConverter = new JcaX509CertificateConverter();
        certificateConverter.setProvider("BC");

        certificate = certificateConverter.getCertificate(certHolder);

        return new FuseCertificate(kp, certificate, signature);
    }
}
