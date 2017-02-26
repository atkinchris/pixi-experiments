uniform sampler2D uSampler;
uniform sampler2D uNormalSampler;

// light color, has multiplied bright for intensity.
uniform vec3 uLightColor;

// light attenuation coefficients (constant, linear, quadratic)
uniform vec3 uLightFalloff;

varying vec2 vTextureCoord;
varying vec2 vNormalTextureCoord;

uniform vec2 uViewSize;

uniform mat3 uWorldMatrix;
uniform bool uFixedNormal;

uniform vec3 uAmbientColor;
uniform vec3 uLightDirection;

void main() {
    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);

    // bail out early when diffuse has no data
    if (diffuseColor.a == 0.0) {
       discard;
    }
    vec4 normalColor = texture2D(uNormalSampler, vNormalTextureCoord);

    // Red layer is X coords.
    // normalColor.r = 1.0 - normalColor.r;

    // Green layer is flipped Y coords.
    normalColor.g = 1.0 - normalColor.g;


    // the directional vector of the light
    vec3 lightVector = uLightDirection;

    // correct for aspect ratio
    lightVector.x *= uViewSize.x / uViewSize.y;

    // compute Distance
    // float D = length(lightVector);

    // normalize vectors
    vec3 N;
    if (uFixedNormal) {
        N = normalize(normalColor.xyz * 2.0 - 1.0);
    } else {
        vec3 normal3 = vec3(normalColor.xyz * 2.0 - 1.0);
        N = normalize(vec3((uWorldMatrix * vec3(normal3.xy, 0.0)).xy , normal3.z));
    }

    vec3 L = normalize(lightVector);

    // pre-multiply light color with intensity
    // then perform "N dot L" to determine our diffuse
    vec3 diffuse = uLightColor * max(dot(N, L), 0.0);

    // calculate attenuation
    float attenuation = 1.0;

    // calculate final intesity and color, then combine
    vec3 intensity = uAmbientColor + diffuse * attenuation;

    vec3 finalColor = diffuseColor.rgb * intensity;

    gl_FragColor = vec4(finalColor, diffuseColor.a);
}
