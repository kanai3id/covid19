import os
import time

from selenium import webdriver

if not os.path.exists("ogp"):
    os.mkdir("ogp")

PATHS = {
    "/?dummy": (959, 500),
    "/cards/details-of-confirmed-cases": (959, 500),
    "/cards/attributes-of-confirmed-cases": (959, 480),
    "/cards/number-of-confirmed-cases": (959, 500),
    "/cards/residential-area-card": (959, 480),
    "/cards/age-card": (959, 600),
    "/cards/stay-card": (959, 500),
    "/cards/beds-card": (959, 600),
    "/cards/gender-card": (959, 600),
    "/cards/number-of-inspection-persons": (959, 600),
    "/cards/number-of-reports-to-covid19-consultation-desk": (959, 500),
    "/cards/adjacent-prefecture-card": (959, 480),
    "/cards/discharge-hospital-card": (959, 500)
}

options = webdriver.ChromeOptions()
options.add_argument("--headless")
options.add_argument("--hide-scrollbars")

driver = webdriver.Chrome(options=options)

for lang in ("ja"):
    if not os.path.exists("ogp/{}".format(lang)):
        os.mkdir("ogp/{}".format(lang))
    for path, size in PATHS.items():
        driver.set_window_size(*size)
        driver.get(
            "http://localhost:8000{}?ogp=true".format(
                path if lang == "ja" else "/{}{}".format(lang, path)
            )
        )
        path = path.replace("/cards/", "").replace("/", "_")
        if ('heatmap' in path):
            time.sleep(20)
        driver.save_screenshot(
            "ogp/{}.png".format(
                path if lang == "ja" else "{}/{}".format(lang, path)
            )
        )
