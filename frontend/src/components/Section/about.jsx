import React, { useEffect } from "react";

const About = () => {
  useEffect(() => {
    const bodyClassList = document.body.classList;
    const bodyBg = bodyClassList.contains("bg-white");
    if (bodyBg) {
      bodyClassList.remove("bg-white");
    }
  });

  return (
    <>
      <div class="p-lg-4 about-us">
        <div class="container p-4 ">
          <div class="row p-4">
            <h2 class="text-white fw-bold mb-4">About Us</h2>
            <div class="col-md-6">
              <img src="/assets/images/image-2.png" alt="" class="img-fluid" />
            </div>
            <div class="col-md-6 my-auto px-md-4">
              <h2 class="border-bottom mb-3 fw-bold">
                Welcome to Paradise Motors Nepal
              </h2>
              <p class="text-white fw-bold" style={{ fontSize: "1.2rem" }}>
                An authorized Dealer of Motors Nepal i.e The First Company which
                introduce the Concept of Autodetailing & Ceramic Coating in
                Nepal.. We are Providing Facilities of Ceramic Coating USA Based
                Technology for Life Time Warranty.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="p-4 section-why bg-white">
        <div class="container py-4">
          <div class="row p-4">
            <div class="col-md-6 mb-4">
              <h2 class="text-color-1 fw-bold mb-4">
                Why Paradise Motors Nepal ?
              </h2>
              <p
                style={{
                  color: "#464646",
                  marginTop: "5rem",
                  fontSize: "1.2rem",
                }}
                className="me-lg-3 fw-bold pe-lg-4"
              >
                The unique formula of System X locks in long-lasting beuty with
                ulta-clean surfaces and gloss retention. System X products are
                specifically formulated to enalbe apllication on virtual all
                dirt- and corrosion-prone surface of your car. That means
                powerful protection for everything from steel and aluminum to
                leather, vinyl, fabric, and glass. The sun is relentless in its
                assault on your automobile's appearance. System X provides
                maximum UV ray protection for paint, to prevent unsightly damgae
                associated with aging and fading colors.
              </p>
            </div>
            <div class="col-md-6 featuresList px-md-4">
              <div class="ps-md-2">
                <h4 className="fw-bold">System-X Diamond</h4>
                <p className="fw-bold">
                  Like no other product, Sytem X Diamond provides paint
                  protection with previously unachievale levels of gloss,
                  durability and chemical resistance. Our longest-lasting
                  coating, System X Diamond blankets your vehicle in a glossy
                  shell of ceramic protection that enhances all colors. Black
                  will appear deeper; red will pop with bright reflections;
                  white and silver will appear as if dipped in glass.
                </p>
              </div>
              <div class="ps-md-2">
                <h4 className="fw-bold">System-X Interior</h4>
                <p className="fw-bold">
                  System X interios creates a high-tech super hydrophobic
                  barrier based on advance nanotechnology to protect your
                  interior - fabric seats, carpet, leather, and vinyl. All with
                  a single professional coating product. Spills and stains clean
                  up easily. Traditional coatings cause materials to become
                  stiff and scatchy or changes the color and appearance, System
                  X Interios protects while retaining your natural look and
                  feel.
                </p>
              </div>
              <div class="ps-md-2">
                <h4 className="fw-bold">System-X Glass</h4>
                <p className="fw-bold">
                  System X Glass coating protects your windshield, windscreen,
                  windows, mirrirs, glass headlamps, and other glass surfaces
                  from micro scratches while multiplying the surface's
                  hydrophobic properties for two full years. System X Glass
                  coating provides a clear, protective coating over glass to
                  keep glass surgace cleaner and clearer while improving driver
                  visibility in all weather conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
