import NavHeader from "../../components/navHeader/navHeader";
import './about.css'

function About(){
    return(
        <div className="about-page">
            <NavHeader />
            <h1>About</h1>
            <h2>Curious to discover how this model was trained?</h2>
            <h2>Let's quickly see what goes under the hood...</h2>
            
            <div className="about-chapter">
                <h3>1. Sourcing our data</h3>
                <p>Every model needs data to train on.</p>
                <p>We source our data from an official government website - <span className="bold-text">https://data.gov.sg/collections/189/view</span></p>
                <p>The data should be as recent as possible to reflect our current housing environment. Hence, we picked resale prices with registration date from Jan-2017 onwards.</p>
            </div>
            <div className="about-chapter">
                <h3>2. Explore your data</h3>
                <p>Knowing your data is crucial to training your model.</p>
                <p>Firstly, the data had many categories - month, town, flat_type, block, street_name, storey_range, floor_area_sqm, flat_model, resale_price, lease_commence_date and remaining_lease.</p>
                <p className="bold-text">Enhancements Made to the Data</p>
                <p>1. "remaining_lease" came as a text field like "99 years 0 months". A model can’t understand text like this, so we extract the numeric part (<code>remaining_lease_years</code>).</p>
                <p>2. We also drop columns like block and street_name which don’t generalize well, and we create a new stratification feature <code>lease_cat</code> by binning lease years. This ensures that our train/test split is balanced across short and long lease flats.</p>
            </div>

            <div className="about-chapter">
                <h3>3. Sampling your data</h3>
                <p>Once we’ve cleaned and enhanced the dataset, we need to split it into training and test sets. But instead of doing a random split, we use <span className="bold-text">stratified sampling</span>.</p>
                <p>Why stratify? A simple random split may accidentally put most new flats in the training set and mostly old flats in the test set, creating an imbalance. Since <span className="bold-text">remaining lease years</span> is a strong driver of resale prices, we bin lease years into categories (e.g., 0–30, 30–60, 60–90) and stratify based on that. This ensures both training and test sets capture the full range of old and new flats, giving us a fairer evaluation.</p>
            </div>

            <div className="about-chapter">
                <h3>5. Applying a Model and Performance Measure</h3>
                <p>To improve beyond Random Forests, I chose <span className="bold-text">CatBoostRegressor</span>, a gradient boosting algorithm designed to handle categorical features natively without one-hot encoding. This is crucial in HDB resale data, where many categorical variables exist and some categories are rare.</p>
                <p>The loss function used was RMSE (Root Mean Squared Error), because resale price prediction is a regression problem and RMSE penalizes large errors more heavily — reflecting real-world importance of avoiding big mispricing.</p>
                <p>I also explicitly specified which columns were categorical, allowing CatBoost to learn category-specific splits efficiently.</p>
            </div>

            <div className="about-chapter">
                <h3>5. Improving our Model</h3>
                <p>To push performance further, we use <span className="bold-text">Bayesian Optimization (BayesSearchCV)</span> for hyperparameter tuning. Unlike grid search, which exhaustively checks combinations, Bayesian search learns which areas of the parameter space are promising and explores them more efficiently.</p>
                <p>We tuned parameters such as the number of iterations, learning rate, depth of trees, and regularization strength. The optimized model achieved:</p>
                <ul>
                    <li><span className="bold-text">Train R²:</span> 0.91</li>
                    <li><span className="bold-text">Test R²:</span> 0.90</li>
                </ul>
                <p>These results show the model generalizes well, with only a small gap between training and test performance — a sign of low overfitting.</p>
            </div>

            <div className="about-chapter">
                <h3>6. Benchmarking with Other Models</h3>
                <p>After improving our CatBoost model, we wanted to ensure that our choice was truly the best fit for this dataset.</p>
                <p>This also establish baselines, justify our decisions, and uncover trade-offs.</p>

                <p className="bold-text">Models Tested</p>
                <p>1. <span className="bold-text">Linear Regression</span> – a simple baseline model. Its RMSE was higher, 
                showing it could not capture the complex interactions in the data.</p>
                <p>2. <span className="bold-text">Random Forests</span> – performed better, reducing error compared to Linear Regression. 
                However, it struggled with high-cardinality categorical features like "town" and "flat_model."</p>
                <p>3. <span className="bold-text">XGBoost</span> – strong performance, close to CatBoost, but required more tuning.</p>
                <p>4. <span className="bold-text">CatBoost</span> – delivered the best results with the lowest RMSE 
                (around <span className="bold-text">0.9092</span> R² on test data), while handling categorical variables directly 
                and reducing preprocessing overhead.</p>

                <p className="bold-text">Why This Matters</p>
                <p>By benchmarking multiple models, we ensure our final choice is evidence-based. This is an industry standard: 
                model selection is not about guessing, but about testing and validating across different approaches. 
                In our case, CatBoost proved to be the most accurate and efficient solution for predicting resale housing prices.</p>
            </div>

            <div className="about-chapter">
                <h3>Conclusion</h3>
                <p>By carefully cleaning the data, stratifying by an important variable (lease years), and choosing a model well-suited for categorical data (CatBoost), we achieved a highly predictive model for HDB resale prices.</p>
                <p>Further improvements could include feature engineering (e.g., proximity to MRTs, schools), ensembling with other models like XGBoost or LightGBM, or applying explainability tools (like SHAP values) to understand feature importance.</p>
            </div>
        </div>
    )
}

export default About;